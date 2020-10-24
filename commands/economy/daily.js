const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

const DAILY_ADDITIVE = 1000;

module.exports = class DailyCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "daily",
      group: "economy",
      memberName: "daily",
      clientPermissions: [],
      description: "Claim your daily amount of flowers",
      argsCount: 0,
      argsType: "single",
    });
  }

  async run(message, args) {
    const user = message.author
    await this.checkDaily(message, user)
  }

  async checkDaily(message, user) {
    await Profile.findOneAndUpdate({
      _id: user.id,
      guildId: message.guild.id
    }, {
      _id: user.id,
      guildId: message.guild.id,
      $setOnInsert: {
        money: 0
      }
    }, {
      new: true,
      upsert: true
    }).then((result) => {
      let differenceInDays = 2
      if(result.dailyClaim) {
        differenceInDays = ((new Date()).getTime() - new Date(result.dailyClaim).getTime()) / (1000 * 3600 * 24)
      }
      if(differenceInDays >= 1) {
        result.dailyClaim = new Date()
        result.money = result.money + DAILY_ADDITIVE
        result.save()
        const outputEmbed = new MessageEmbed()
          .setDescription(`You now have ${result.money} ${config.currencyIcon}.`)
        message.reply(outputEmbed)
      } else {
        let timeLeft, timeUnit;
        [timeLeft, timeUnit] = this.getLeftoverTime(differenceInDays)
        const outputEmbed = new MessageEmbed()
          .setDescription(`Your daily is currently not ready yet! You have ${timeLeft} ${timeUnit} left until you can claim your daily.`)
        message.reply(outputEmbed)
      }
    })
  }

  getLeftoverTime(differenceInDays) {
    let timeUnit = "hours"
    let timeLeft = Math.floor(((1-differenceInDays)*24) % 60)
    if(timeLeft < 1) {
      timeLeft = Math.floor((1-differenceInDays)*1440)
      timeUnit = "minutes"
    }
    return [timeLeft, timeUnit]
  }
}
