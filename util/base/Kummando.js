const { Command } = require("discord.js-commando")

module.exports = class Kummando extends Command {
  constructor(client, options) {
    super(client, options)
    this.rolePermissions = [];
    this.info = { ...options}
    if(!client.commands.get(options.name)) {
      client.commands.set(options.name, {...options})
    }
  }

  hasPermission(message) {
    if(!this.info.rolePermissions || !this.info.rolePermissions.length) return true;
    for(let roleName of this.info.rolePermissions) {
      const role = message.guild.roles.cache.find(role => role.name === roleName)
      const userRole = message.member.roles.cache.first()

      if(message.member.roles.cache.find(role => role.name.toUpperCase() === roleName.toUpperCase()))
        return true
      if(userRole.position > role.position)
        return true
    }
    return false
  }
}
