const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if(reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}
module.exports = async (bot, id, text, reactions = []) => {
  const channel = await bot.channels.fetch(id)
  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      channel.send(text).then(message => {
        addReactions(message, reactions)
        return message
      })
    } else {
      message = messages.first();
      if(message) {
        message.edit(text)
        addReactions(message, reactions)
      }
      return message
    }
  })
}
