const express = require("express");
const config = require("./settings.json");
const mongoose = require("mongoose")
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
const app = express();
require('newrelic');


mongoose.connect(config.mongodbURL);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
  let now = new Date();
  let delay = 3600*1000;
  function herokuJob() {
    console.log(`App is running on port ${ PORT }`)
  }

  setInterval(herokuJob, delay)
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log("Kuma bot is now online!");
  const channel = bot.channels.cache.get("738539053372145715")
  channel.send("Kuma Bot has come online!")
});

bot.on("message", message => {
  if(!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(bot.commands.get(command)) {
    console.log("Kuma Bot is attempting to run command [" + command + "]");
    switch(command) {
      default:
        const cmd = bot.commands.get(command);
        if(cmd.permissionLevel) {
          if(config[cmd.permissionLevel][""+message.author.id+""]) {
            bot.commands.get(command).execute(bot, message, args);
          } else {
            message.channel.send(config.WARNING_PERMISSION_DENIED)
          }
        } else {
          bot.commands.get(command).execute(bot, message, args);
        }
    }
  }
});

bot.login(config.token);
