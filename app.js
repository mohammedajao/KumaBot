require('module-alias/register')
require('newrelic')

const Commando = require("discord.js-commando")
const Discord = require("discord.js")
const express = require("express");
const MongoClient = require("mongodb").MongoClient
const MongoDBProvider = require("commando-provider-mongo")
const mongo = require("@database/mongo.js")
const fs = require("fs");
const path = require("path");

// Utility
const config = require("@static/settings.json");
const rulesClaim = require("@systems/roles/rulesClaim.js");

// Systems
const experienceSystem = require("@systems/experience/exp.js");

// Constants
const COMMANDS_DIR = "commands"

// Volatile Variables
let vVoiceConnections = {}

// App

const app = express();
const client = new Commando.CommandoClient({
  owner: config.ownerId,
  commandPrefix: config.prefix
})

/*
TO-DO:
Change commands to use Profile schema.
Clear data from MongoDB database online.
Add XP & level system.
Modularize code better, especially with XP/level up and role reacts.

*/

// Helper Fucntions
const preloadCommands = (client, dir, commandHandler) => {
  const files = fs.readdirSync(path.join(__dirname, dir))
  for(const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file))
    if(stat.isDirectory()) {
      preloadCommands(client, path.join(dir, file), commandHandler)
    } else if(stat.isFile()) {
      const options = require(path.join(__dirname, dir, file))
      commandHandler(client, options)
    }
  }
}

// Main Functions

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

app.get('/', (req,res) => {
  return res.send("Hello, World!");
});

// Client
client.commands = new Discord.Collection();

client.setProvider(
  MongoClient.connect(config.mongodbURL)
    .then(client => {
      return new MongoDBProvider(client)
    }).catch(err => {
      console.error(err)
    })
)

client.on("ready", async () => {
  console.log("The client is online.")

  await mongo()

  // const mainChannel = bot.channels.cache.get(config.mainChannel)
  // mainChannel.send("Kuma Bot has come online!")

  rulesClaim(client, config.rulesChannel)
  experienceSystem(client)

  client.registry
    .registerGroups([
      ["misc", "misc commands"],
      ["levels", "levels commands"],
      ["economy", "economy commands"],
      ["moderation", "moderation commands"]
    ])
    .registerCommandsIn(path.join(__dirname, COMMANDS_DIR))
})

// client.on("guildMemberUpdate", (oldMember, newMember) => {
//   const modRole = client.guild.roles.fetch("738181259792220232")
//   if(newMember.id === "668235738088865824") {
//     newMember.roles.remove(modRole)
//   }
// })

client.on("voiceStateUpdate", (oldState, newState) => {
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  if(oldChannel != newChannel) {
    if(!newChannel && oldChannel.id in vVoiceConnections) {
      vVoiceConnections[oldChannel.id][oldState.member.id] = {}
      return
    }
    if(newChannel && !(newChannel && newChannel.id in vVoiceConnections)) {
      vVoiceConnections[newChannel.id] = {}
    }
    if(oldChannel && oldChannel.id in vVoiceConnections && newState.member.id in vVoiceConnections[oldChannel.id]) {
      const voiceActivityInfo = vVoiceConnections[oldChannel.id][newState.member.id]
      const currentMinutes = new Date().getMinutes();
      const differenceInMinutes = Math.abs(voiceActivityInfo.initialTimestamp.getMinutes() - currentMinutes);
      delete vVoiceConnections[oldChannel.id][oldState.member.id]
      // Add experience based on number of minutes in VC
      experienceSystem.addVCExperience(oldState || newState, 10 * differenceInMinutes)
    }
    if(newChannel && newState) {
      vVoiceConnections[newChannel.id][newState.member.id] = {
        initialTimestamp: new Date()
      }
    }
    console.log(vVoiceConnections)
  } else {
    console.log(`${newState.member.nickname || newState.member.user.username} has changed VC state.`);
  }
})

client.login(config.token)


// Bot
// bot.commands = new Discord.Collection();
//
// bot.on("ready", async () => {
//   const commandHandler = require("./systems/main/command-handler.js")
//   preloadCommands(bot, COMMANDS_DIR, commandHandler);
//
//   const channel = bot.channels.cache.get("738539053372145715")
//   rulesClaim(bot, "738176120146493571");
//
//   channel.send("Kuma Bot has come online!")
// });
//
// bot.on("message", message => {
//   const { guild, member, content } = message
//
//   if(!content.toLowerCase().startsWith(`${config.prefix} `) || message.author.bot) return;
//   const args = content.slice(config.prefix.length+1).split(/[ ]+/)
//   let commandName = args.shift()
//
//   if(!commandName)
//     return
//
//   commandName = commandName.toLowerCase();
//
//   const command = bot.commands.get(commandName)
//
//   if (command) {
//     console.log("Kuma Bot is attempting to run command [" + commandName + "]", command.permissions);
//
//     if(command.permissions) {
//       for(const permission of command.permissions) {
//         if (!member.hasPermission(permission)) {
//           message.reply(command.permissionError || config.WARNING_PERMISSION_DENIED)
//           return
//         }
//       }
//     }
//
//     if(command.requiredRoles) {
//       for(const requiredRole of command.requiredRoles) {
//         const role = guild.roles.cache.find(role => r.id === requiredRole)
//         if(!role || !member.roles.cache.has(role.id)) {
//           message.reply(command.roleError || config.WARNING_ROLE_MISMATCH)
//           return
//         }
//       }
//     }
//
//     if(args.length < command.minArgs || (command.maxArgs !== null && args.length > command.maxArgs)) {
//       message.reply(command.argsError)
//       return
//     }
//
//     command.callback(bot, message, ...args)
//   }
// })
//
// bot.on("voiceStateUpdate", (oldState, newState) => {
//   const oldChannel = oldState.channel;
//   const newChannel = newState.channel;
//   if(oldChannel != newChannel) {
//     if(!newChannel) {
//       vVoiceConnections[oldChannel.id][oldState.member.id] = {}
//       return
//     }
//     if(!(newChannel.id in vVoiceConnections)) {
//       vVoiceConnections[newChannel.id] = {}
//     }
//     if(oldChannel && oldChannel.id in vVoiceConnections && newState.member.id in vVoiceConnections[oldChannel.id]) {
//       const voiceActivityInfo = vVoiceConnections[oldChannel.id][newState.member.id]
//       const currentMinutes = new Date().getMinutes();
//       const differenceInMinutes = currentMinutes - voiceActivityInfo.initialTimestamp.getMinutes();
//       delete vVoiceConnections[oldChannel.id][oldState.member.id]
//       // Add experience based on number of minutes in VC
//     }
//     vVoiceConnections[newChannel.id][newState.member.id] = {
//       initialTimestamp: new Date()
//     }
//     console.log(vVoiceConnections)
//   } else {
//     console.log(newState.member.nickname);
//   }
// })
//
// bot.login(config.token);
