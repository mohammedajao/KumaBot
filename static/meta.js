const roleLevels = [
  {
    name: "Kuma",
    levelRequirement: 5
  },
  {
    name: "Demon Child",
    levelRequirement: 20
  },
  {
    name: "Chaotic Imp",
    levelRequirement: 66
  },
  {
    name: "Homie",
    levelRequirement: 70
  }
]

const permissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
]

const rules =  {
  "Rule 1": "Follow Discord's [terms of service](https://discord.com/new/terms) and [guidelines](https://discord.com/new/guidelines).",
  "Rule 2": "Read the pins of every channel, especially if you have a question on a topic.",
  "Rule 3": "Offensive avatars, names, or content are not allowed such as racism, anti-semitism, or sexuality discrimination.",
  "Rule 4": "Do not spam in any channel except #shitpost. Copy pastes/text walls are considered as such.",
  "Rule 5": "Harassment of any member is a kickable offense after one warning and bannable on the third.",
  "Rule 6": "Leave moderation to the staff. Do not self-moderate and feel free to DM moderators.",
  "Rule 7": "Speak to a Moderator before speaking to an Admin.",
  "Rule 8": "If you have a complaint with a staff member, message a higher authority with a complaint.",
  "Rule 9": "Implied Consent means staff have the ability to determine punishments outside the scope of the rules. If you feel there's an issue with a punishment not outlined in the rules, speak with a higher authority.",
  "Rule 10": "Rules are subject to change so keep note when they are."
}

module.exports.ROLE_LEVELS = roleLevels
module.exports.VALID_PERMISSIONS = permissions
module.exports.RULES = rules
