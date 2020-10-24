const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

module.exports = class AwardCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "richest",
      group: "economy",
      memberName: "richest",
      clientPermissions: [],
      description: "Reveals the richest users on the server",
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setAuthor(this.client.user.username, "https://cdn140.picsart.com/235170552010202.jpg")
      .setThumbnail("https://cdn140.picsart.com/235170552010202.jpg")
      .setTitle("Leaderboard");
    Profile.find({guildId: message.guild.id}).sort({money: -1}).limit(10).exec((err, kumas) => {
      if(err) {
        console.log(err);
        message.channel.send("Failed to fetch leaderboard. Report to staff.")
      } else {
        kumas.map((kuma, index) => {
          const user = message.guild.members.cache.get(kuma._id)
          embed.addField((index+1) + ". " + user.user.username, `${kuma.money} ${config.currencyIcon}`, true)
        })
        message.channel.send(embed);
      }
    })
  }
}
