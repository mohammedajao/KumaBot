const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

module.exports = class BalanceCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "balance",
      group: "economy",
      memberName: "balance",
      aliases: ["bal"],
      clientPermissions: [],
      description: "Shows the amount of flowers you currently hold",
      argsCount: 0,
      argsType: "single",
    });
  }

  async run(message, args) {
    const user = message.author
    await this.revealBalance(message, user)
  }

  async revealBalance(message, user) {
    await Profile.findOneAndUpdate({
      _id: user.id,
      guildId: message.guild.id
    }, {
      $setOnInsert: {
        _id: user.id,
        guildId: message.guild.id,
        money: 0,
        experience: 0,
        level: 1
      }
    }, {
      new: true,
      upsert: true
    }).then((result) => {
      message.channel.send(new MessageEmbed().setDescription(`**${user.username}** has ${result.money} ${config.currencyIcon}`))
    })
  }
}
