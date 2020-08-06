const mongoose = require("mongoose")

const dailyCurrencySchema = new mongoose.Schema({
  userID: Number,
  date: Date
})

module.exports = mongoose.model("DailyCurrency", dailyCurrencySchema)
