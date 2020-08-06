const config = require("./settings.json");
const mongoose = require("mongoose")
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();

mongoose.connect(config.mongodbURL);

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
  channel.send("@everyone Kuma Bot has come online!")
});

bot.on("message", message => {
  if(!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(bot.commands.get(command)) {
    console.log("Kuma Bot is attempting to run command [" + command + "]");
    switch(command) {
      case "rules":
        if(message.author.id != config.ownerId) {
          message.channel.send(config.WARNING_PERMISSION_DENIED)
          break;
        }
      default:
        bot.commands.get(command).execute(bot, message, args)
    }
  }
});

bot.login(config.token);
