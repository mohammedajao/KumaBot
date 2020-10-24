const mongoose = require("mongoose")
const config = require("@static/settings.json")

module.exports = async () => {
  await mongoose.connect(config.mongodbURL, {
    keepAlive: true,
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  return mongoose
}
