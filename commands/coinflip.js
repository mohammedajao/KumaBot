const Discord = require("discord.js")
const config = require("../settings.json");

module.exports = {
  name: "coinflip",
  description: "This feature currently isn't complete.",
  execute: function(bot, message, args) {
    const chance = Math.floor(Math.random() * 10);
    if(chance < 5) {
      message.channel.send("You got heads!")
    } else {
      message.channel.send("You got tails!")
    }
  }
}
