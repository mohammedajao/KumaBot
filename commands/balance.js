const mongoose = require("mongoose");
const config = require("../settings.json");

mongoose.connect("mongodb://elo:X98ljFBCvShdgu3M@kumabot-shard-00-00.xkfzy.mongodb.net:27017,kumabot-shard-00-01.xkfzy.mongodb.net:27017,kumabot-shard-00-02.xkfzy.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-7zgk50-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useNewUrlParse: true,
  useUnifedToplogy: true
});

// Require Model
const Currency = require("../schemas/Currency.js");

module.exports = {
  name: "balance",
  description: "Check your current currency",
  execute: async function(bot, message, args) {
    const user = message.author;
    Currency.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newCurrency = new Currency({
          name: bot.users.cache.get(user.id).username,
          userID: user.id,
          money: 0
        })
        newCurrency.save().catch(err => console.log(err))
        message.channel.send(`${bot.users.cache.get(user.id).username} has $0 ${config.currencyIcon}`)
      } else {
        message.channel.send(`${bot.users.cache.get(user.id).username} has ${data.money} ${config.currencyIcon}`)
      }
    })
  }
}
