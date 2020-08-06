const Discord = require("discord.js")
const config = require("../settings.json");

module.exports = {
  name: "help",
  description: "Check all the commands, features, and other miscellaneous information.",
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username)
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name", bot.user.username);
    for(const cmd of bot.commands.keys()) {
      console.log(cmd);
      embed.addField(cmd, bot.commands.get(cmd).description)
    }
    return message.channel.send(embed);
  }
}
