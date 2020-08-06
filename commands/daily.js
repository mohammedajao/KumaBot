const mongoose = require("mongoose")
const config = require("../settings.json")
const Discord = require("discord.js");


const DailyCurrency = require("../schemas/DailyCurrency.js")
const Currency = require("../schemas/Currency.js")

module.exports = {
  name: "daily",
  description: `Get your daily ${config.currencyIcon}.`,
  execute: async function(bot, message, args) {
    const user = message.author
    let embed = new Discord.MessageEmbed();
    DailyCurrency.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err)
      if(!data) {
        const newDaily = new DailyCurrency({
          userID: user.id,
          date: new Date()
        })
        newDaily.save().catch(err => console.log(err));
        Currency.findOne({
          userID: user.id
        }, (err, info) => {
          if(err) console.log(err)
          if(!info) {
            const newCurrency = new Currency({
              name: bot.users.cache.get(user.id).username,
              userID: user.id,
              money: 100
            })
            newCurrency.save().catch(err => console.log(err))
            embed.setDescription(`**${bot.users.cache.get(user.id).username}** is new and now has $100 ${config.primaryIcon}.`)
            message.channel.send(embed)
          } else {
            info.money = info.money + 100
            info.save()
            embed.setDescription(`**${bot.users.cache.get(user.id).username}** now has ${info.money} ${config.primaryIcon}.`)
            message.channel.send(embed)
          }
        })
      } else {
        const differenceInDays = ((new Date()).getTime() - data.date.getTime()) / (1000 * 3600 * 24)
        if(differenceInDays >= 1) {
          data.date = new Date();
          data.save().catch(err => console.log(err))
          Currency.findOne({
            userID: user.id
          }, (err, info) => {
            if(err) console.log(err)
            if(!info) {
              const newCurrency = new Currency({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                money: 100
              })
              newCurrency.save().catch(err => console.log(err))
              embed.setDescription(`**${bot.users.cache.get(user.id).username}** is new and now has $100 ${config.primaryIcon}.`)
              message.channel.send(embed)
            } else {
              info.money = info.money + 100
              info.save().catch(err => console.log(err))
              embed.setDescription(`**${bot.users.cache.get(user.id).username}** now has ${info.money} ${config.primaryIcon}.`)
              message.channel.send(embed)
            }
          })
        } else {
          timeUnit = "hours"
          timeLeft = Math.floor(((1-differenceInDays)*24) % 60)
          if(timeLeft < 1) {
            timeLeft = Math.floor((1-differenceInDays)*1440)
            timeUnit = "minutes"
          }
          embed.setDescription(`Your daily is currently not ready yet! You have ${timeLeft} ${timeUnit} left until you can claim your daily.`);
          message.channel.send(embed)
        }
      }
    })
  }
}
