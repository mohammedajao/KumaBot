const mongoose = require("mongoose")
const Profile = require("@schemas/Profile.js")
const { ROLE_LEVELS } = require("@static/meta.js");
const config = require("@static/settings.json")

module.exports = (client) => {
  client.on('message', message => {
    const { guild, member } = message
    addExperience(message, 1)
  })
}

const xpToLevel = (exp, levelTarget, level) => {
  let amount = 0
  if(level != levelTarget - 1) {
    amount = amount + levelingFormula(exp, levelTarget, (level || 0) + 1)
  } else {
    return 0.25 * (level + 300 * Math.pow(2, level/7))
  }
  return (level + 300 * Math.pow(2, level/7))
}

const assignRoles = (member, guild, level) => {
  ROLE_LEVELS.map(role => {
    const targetRole = guild.roles.cache.find(r => r.name === role.name)
    if(level === role.levelRequirement) {
      member.roles.add(targetRole)
      return
    }
  })
}

const fetchProfileAndUpdateXP = async (user, guild, amount) => {
  const channel = await guild.channels.cache.get(config.botCommandsChannel)
  await Profile.findOneAndUpdate({
    _id: user.id,
  }, {
    _id: user.id,
    guildId: guild.id,
    $inc: {
      experience: amount
    }
  }, {
    new: true,
    upsert: true
  }).then(data => {
    const xpRequirement = xpToLevel(data.experience, data.level + 1, data.level)
    console.log(`Gave ${user.name || user.nickname || user.username} ${amount} xp. They have ${data.experience} XP and need ${xpRequirement} XP to level.`)
    assignRoles(user, guild, data.level)
    if(data.experience >= xpRequirement) {
      data.experience = Math.floor(data.experience - xpRequirement)
      data.level = data.level + 1
      data.save()
      channel.send(`@${user.id} have leveled up to **${data.level}**.`)
    }
  })
}

const addExperience = async (message, amount) => {
  fetchProfileAndUpdateXP(message.author, message.guild, amount)
}

const addVCExperience = async (state, amount) => {
  console.log("Giving experience via VC")
  fetchProfileAndUpdateXP(state.member, state.guild, amount)
}

module.exports.addExperience = addExperience
module.exports.addVCExperience = addVCExperience
