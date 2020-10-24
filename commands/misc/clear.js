const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

module.exports = class ClearCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "clear",
      group: "misc",
      memberName: "clear",
      clientPermissions: ["MANAGE_MESSAGES"],
      description: "Clears [X] amount of text messages",
      rolePermissions: ["MOD TEAM"],
      argsCount: 1,
      argsType: "single",
      hidden: true
    });
  }

  async run(message, args) {
    const amount = Number(args)
    if(isNaN(amount) || amount <= 0) return message.reply("Enter a valid number.")
    if(amount > 50) return message.reply("You can only delete 50 messages at max.")
    message.channel.bulkDelete(amount + 1, true)
  }
}
