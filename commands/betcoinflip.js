const Discord = require("discord.js")
const config = require("../settings.json");

const Currency = require("../schemas/Currency.js");

const VALID_FLIP_ARGS = {
  "tails": true,
  "heads": true
}

module.exports = {
  name: "betcoinflip",
  description: "Gamble your flowers over a coinflip!",
  execute: function(bot, message, args) {
    const user = message.author;
    let embed  = new Discord.MessageEmbed();
    let oppositeResult = "[HEADS]";
    const chance = Math.floor(Math.random() * 10);

    if(args.length < 2) {
      message.channel.send("Enter in the following order whether you bet heads or tails and the amount.");
      return;
    }
    const amount = Number(args[1]);
    const betString = args[0].toLowerCase();

    if(amount == null || amount == "undefined" || isNaN(amount)) {
      message.channel.send("Invalid order or incorrect amount/bet type. It's [HEADS/TAILS] [AMOUNT]");
      return;
    }

    if(!VALID_FLIP_ARGS[betString]) {
      message.channel.send("Invalid order or incorrect amount/bet type. It's [HEADS/TAILS] [AMOUNT]");
      return;
    }

    if(betString === "heads") {
      oppositeResult = "[TAILS]"
    }

    Currency.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        embed.setDescription(`You don't have anything to bet. Check your balance.`);
        message.channel.send(embed);
      } else {
        if(data.money < Math.abs(amount)) {
          message.channel.send("You do not have enough money to make this bet!")
        }
        if(chance < 4) {
          embed.setDescription(`You got ${oppositeResult}. You lost ${amount} ${config.currencyIcon}.`)
          data.money = data.money - Math.abs(amount);
          data.save();
        } else {
          embed.setDescription(`Congrats! You got [${betString.toUpperCase()}]. You gained ${amount} ${config.currencyIcon}.`)
          data.money = data.money + Math.abs(amount);
          data.save();
        }
        message.channel.send(embed);
      }
    })
  }
}
