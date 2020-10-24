const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

module.exports = class TestCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "test",
      group: "misc",
      memberName: "test",
      description: "Pongers",
      rolePermissions: ["ADMINISTRATOR"],
      hidden: true
    });
  }

  async run(message, args) {
    message.reply("Yo!")
  }
}
