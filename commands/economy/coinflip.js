const Kummando = require("@util/base/Kummando.js")
const { RichEmbed, MessageEmbed } = require('discord.js');

const config = require("@static/settings.json");

module.exports = class CoinflipCommand extends Kummando {
  constructor(client) {
    super(client, {
      name: "coinflip",
      aliases: ["cf"],
      group: "economy",
      memberName: "coinflip",
      clientPermissions: [],
      description: "Flips a coin"
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setDescription("Bot Information")
    const chance = Math.floor(Math.random() * 10);
    if(chance < 5) {
      embed.setDescription("You got **heads!**")
        .setThumbnail("https://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-back.png")
    } else {
      embed.setDescription("You got **tails!**")
        .setThumbnail("https://researchmaniacs.com/Random/Images/Quarter-Tails.png")
    }
    return message.reply(embed);
  }
}
