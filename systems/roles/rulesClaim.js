const config = require("@static/settings.json")

const reactionHandler = (reaction, user, bool) => {
  const role = reaction.message.guild.roles.cache.find(role => role.name === "Bear");
  const member = reaction.message.guild.members.cache.find(member => member.id === user.id)
  if(bool) {
    member.roles.add(role);
  }
}

module.exports = async (client, channelId) => {
  const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name == emojiName)
  const channel = await client.channels.fetch(channelId)
  channel.messages.fetch().then((messages) => {
    const message = messages.first();
    message.react(config.registryEmote);
  })
  client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.channel.id === channelId && reaction.emoji.name == config.registryEmote) {
      reactionHandler(reaction, user, true)
    }
  })
  client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.channel.id === channelId && reaction.emoji.name == config.registryEmote) {
      reactionHandler(reaction, user, false)
    }
  })
}
