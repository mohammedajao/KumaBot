const Discord = require("discord.js")
const config = require("../settings.json");

module.exports = {
  name: "help",
  description: "Check all the commands, features, and other miscellaneous information.",
  execute: function(bot, message, args) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name", bot.user.username)
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg");
    for(const cmd of bot.commands.keys()) {
      console.log(cmd);
      embed.addField(cmd, bot.commands.get(cmd).description)
    }
    return message.channel.send(embed);
  }
}
