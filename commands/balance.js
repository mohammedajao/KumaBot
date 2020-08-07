const Discord = require("discord.js");
const config = require("../settings.json");

// Require Model
const Currency = require("../schemas/Currency.js");

module.exports = {
  name: "balance",
  description: `Check your how many flowers ${config.currencyIcon} you have.`,
  execute: async function(bot, message, args) {
    const user = message.author;
    let embed  = new Discord.MessageEmbed();
    Currency.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newCurrency = new Currency({
          name: bot.users.cache.get(user.id).username,
          userID: user.id,
          money: 0
        })
        newCurrency.save().catch(err => console.log(err))
        embed.setDescription(`**${bot.users.cache.get(user.id).username}** has $0 ${config.currencyIcon}`);
        message.channel.send(embed);
      } else {
        embed.setDescription(`**${bot.users.cache.get(user.id).username}** has ${data.money} ${config.currencyIcon}`);
        message.channel.send(embed);
      }
    })
  }
}
