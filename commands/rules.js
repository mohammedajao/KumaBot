const Discord = require("discord.js")
const config = require("../settings.json");
const rules = require("../rules.json");

module.exports = {
  name: "rules",
  description: "Check the server rules.",
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed()
      .setColor(config.primaryColor)
      .setTitle("Rules")
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setTimestamp()
      .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg")
    for(rule in rules) {
      embed.addField(`${config.primaryIcon} ${rule}:`, rules[rule])
    }
    message.channel.send(embed);
  }
}
