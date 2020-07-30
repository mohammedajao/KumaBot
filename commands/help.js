const Discord = require("discord.js")
const config = require("../settings.json");

module.exports = {
  name: "help",
  description: "",
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username)
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name", bot.user.username);
    return message.channel.send(embed);
  }
}
