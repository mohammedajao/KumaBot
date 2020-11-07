const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed, MessageAttachment } = require('discord.js');
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
    const user = message.mentions.users.first() || message.author
    const key = `${message.guild.id}-${user.id}`;
    console.log(user)
    await Profile.findOneAndUpdate({
      _id: user.id,
      guildId: message.guild.id,
    }, {
      _id: user.id,
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
      const profiler = message.guild.members.cache.get(user.id)
      const name = profiler.user.username
      const nickname = profiler.nickname
      const outputEmbed = new MessageEmbed()
        .setTitle(`${ nickname != null ? nickname : name}'s Profile`)
        .setAuthor(nickname != null ? nickname : name, user.avatarURL())
        .setTimestamp()
        .setColor(config.primaryColor)
        .addField("Username", name)
        .addField("Level", result.level, true)
        .addField("Experience", result.experience, true)
        .addField("Flowers", result.money)
        .setFooter("Thank you for reading!", "https://cdn140.picsart.com/235170552010202.jpg")
      message.channel.send(outputEmbed)
    })
  }
}
