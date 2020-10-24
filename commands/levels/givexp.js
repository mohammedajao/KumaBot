const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

module.exports = class AwardCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "givexp",
      aliases: ["gxp", "giveexp","giveepxerience","gexp"],
      group: "levels",
      memberName: "givexp",
      clientPermissions: [],
      rolePermissions: ["Administrator"],
      description: "Give [X] amount of experience to a user",
      argsCount: 2,
      argsType: "multiple",
      hidden: true
    });
  }

  async run(message, args) {
    const user = message.mentions.users.first()
    const amount = Number(args[1])
    if(!user) return message.reply("No user was found.")
    const userId = user.id
    if(isNaN(amount)) return message.reply("Enter a valid number.")
    await this.addExperience(message, user, amount)
  }

  async addExperience(message, user, amount) {
    await Profile.findOneAndUpdate({
      _id: user.id,
      guildId: message.guild.id,
    }, {
      _id: user.id,
      guildId: message.guild.id,
      $inc: {
        experience: amount
      }
    }, {
      new: true,
      upsert: true
    }).then((result) => {
      message.channel.send(new MessageEmbed().setDescription(`**${user.username}** now has **${result.experience} experience**`))
    })
  }
}
