const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

module.exports = class ProfileCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "profile",
      aliases: ["myprofile"],
      group: "misc",
      memberName: "profile",
      clientPermissions: [],
      description: "Shows your Kuma Profile in the server",
    });
  }

  async run(message, args) {
    await Profile.findOneAndUpdate({
      _id: message.author.id,
      guildId: message.guild.id,
    }, {
      _id: message.author.id,
      guildId: message.guild.id,
      $setOnInsert: {
        experience: 0,
        level: 1,
        money: 0
      }
    }, {
      new: true,
      upsert: true
    }).then((result) => {
      const outputEmbed = new MessageEmbed()
        .setTitle(`${message.member.nickname || message.author.username}'s Profile`)
        .setAuthor(message.member.nickname || message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setColor(config.primaryColor)
        .addField("Username", message.author.username)
        .addField("Level", result.level, true)
        .addField("Experience", result.experience, true)
        .addField("Flowers", result.money)
        .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg")
      message.channel.send(outputEmbed)
    })
  }
}
