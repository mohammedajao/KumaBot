const mongoose = require("mongoose")
const config = require("../settings.json")
const Discord = require("discord.js");

const Currency = require("../schemas/Currency.js")

module.exports = {
  name: "award",
  description: `Awards a player an amount of ${config.currencyIcon}`,
  permissionLevel: config.permissionLevels[0],
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed().setAuthor(bot.user.username);
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const award = Number(args[1]);
    if(award == null || award == "undefined" || isNaN(award)) {
      message.channel.send("No award was given.");
      return;
    } else if(user == null || user == "undefined") {
      message.channel.send("No user was found.");
      return;
    }

    Currency.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newCurrency = new Currency({
          name: bot.users.cache.get(user.id).username,
          userID: user.id,
          money: award
        })
        newCurrency.save().catch(err => console.log(err))
        embed.setDescription(`**${bot.users.cache.get(user.id).username}** was award ${newCurrency.money} ${config.currencyIcon}`);
        message.channel.send(embed);
      } else {
        data.money = data.money + award;
        data.save();
        embed.setDescription(`**${bot.users.cache.get(user.id).username}** has ${data.money} ${config.currencyIcon}`);
        message.channel.send(embed);
      }
    })
  }
}
