const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');
const config = require("@static/settings.json");

const Profile = require("@schemas/Profile.js")

const VALID_FLIP_ARGS = {
  "tails": "heads",
  "heads": "tails"
}

module.exports = class BetcoinflipCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "betcoinflip",
      aliases: ["bcf", "bcoinflip"],
      group: "economy",
      memberName: "betcoinflip",
      clientPermissions: [],
      description: "Flips a coin for a return or loss of [X] amount of flowers",
      argsCount: 2,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    if(!args[0]) return
    const betString = args[0].toLowerCase()
    const amount = Number(args[1])
    let oppositeResult = betString
    if(!(betString in VALID_FLIP_ARGS)) return message.reply("Enter heads/tails.")
    oppositeResult = VALID_FLIP_ARGS[betString]
    if(isNaN(amount) || amount < 1) return message.reply("Enter heads/tails and a valid number greater than 0.")
    const chance = Math.floor(Math.random() * 10);
    if(chance < 4) {
      this.gambleResult(message, amount, betString)
    } else {
      this.gambleResult(message, -amount, oppositeResult)
    }
  }

  getFlip(side, amount, net) {
    let embed = new MessageEmbed()
    let output = `Congrats! You got **${side}**! You now have ${amount} ${config.currencyIcon}`
    if(net < 0) {
      output = `You got **${side}**. You lost ${Math.abs(net)} ${config.currencyIcon}.`
    }
    if(side == "heads") {
      return embed.setDescription(output)
        .setThumbnail("https://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-back.png")
    }
    return embed.setDescription(output)
      .setThumbnail("https://researchmaniacs.com/Random/Images/Quarter-Tails.png")
  }

  async gambleResult(message, amount, result) {
    await Profile.findOneAndUpdate({
      _id: message.author.id,
    }, {
      _id: message.author.id,
      guildId: message.guild.id,
      $setOnInsert: {
        money: 0
      }
    }, {
      new: true,
      upsert: true
    }).then(data => {
      if(data.money < Math.abs(amount)) {
        return message.reply("You do not have enough money to make that bet.")
      }
      data.money = data.money + amount
      data.save()
      return message.reply(this.getFlip(result, data.money, amount))
    })
  }
}
