const mongoose = require("mongoose")

const reqString = {
  type: String,
  required: true
}

const Profile = new mongoose.Schema({
  // GuildId
  _id: reqString,
  guildId: reqString,
  dailyClaim: {
    type: Date,
    default: new Date()
  },
  money: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
})

module.exports = mongoose.model("Profile", Profile)
