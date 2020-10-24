const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

module.exports = class HelpCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "help",
      group: "misc",
      memberName: "help",
      clientPermissions: [],
      description: "Gives the commands list of the server"
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setAuthor(this.client.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name", this.client.user.username)
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg");
    for(const cmd of this.client.commands.keys()) {
      const command = this.client.commands.get(cmd)
      if(command && !command.hidden) {
        if(command.aliases && command.aliases.length) {
          let summedAliases = command.aliases.reduce((old, newAlias) =>  old + ", " + newAlias)
          embed.addField(cmd + ", " + summedAliases, this.client.commands.get(cmd).description)
          continue
        }
        embed.addField(cmd, this.client.commands.get(cmd).description, true)
      }
    }
    return message.embed(embed);
  }
}
