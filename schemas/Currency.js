const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  name: String,
  userID: String,
  money: Number
})

module.exports = mongoose.model("Currency", currencySchema)
