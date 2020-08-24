const mongoose = require("mongoose")
const config = require("../settings.json")
const Discord = require("discord.js");

const Currency = require("../schemas/Currency.js")

module.exports = {
  name: "richest",
  description: `Top rankings of flowers`,
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setTitle("Leaderboard");
    Currency.find({}).sort({money: -1}).limit(10).exec((err, kumas) => {
      if(err) {
        console.log(err);
        message.channel.send("Failed to fetch leaderboard. Check console for errors.")
      } else {
        kumas.map((kuma, index) => {
          console.log(kuma)
          embed.addField((index+1) + ". " + kuma.name, `${kuma.money} ${config.currencyIcon}`, true)
        })
        message.channel.send(embed);
      }
    })
  }
}
