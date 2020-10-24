const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");
const { RULES } = require("@static/meta.js")

module.exports = class RulesCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "rules",
      group: "misc",
      memberName: "rules",
      clientPermissions: [],
      rolePermissions: ["MOD TEAM"],
      description: "Gives the rules of the server"
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setTitle("Rules")
      .setTimestamp()
      .setAuthor(this.client.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setColor(config.primaryColor)
      .addField("Bot Name", this.client.user.username)
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg");
      for(let rule in RULES) {
        embed.addField(`${config.primaryIcon} ${rule}:`, RULES[rule])
      }
    return message.embed(embed);
  }
}
