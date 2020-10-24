const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

module.exports = class ServerAboutCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "sabout",
      group: "misc",
      aliases: ["serverabout"],
      memberName: "sabout",
      description: "Gives information about the server"
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setAuthor(this.client.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setDescription("Server Information")
      .setColor("#15f153")
      .addField("Bot Name", this.client.user.username)
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg");
    this.client.guilds.cache.forEach((guild) => {
        embed.addField("Amount of Users", guild.memberCount)
    })
    return message.embed(embed);
  }
}
