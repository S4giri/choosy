const { Schema, model } = require('mongoose')

const centralSchema = new Schema({
    _id: String,
    tokens: { type: String, default: null },
    status: { 
        text: { type: String, default: "hosted by Sagiri" },
        type: { type: Number, default: 1 },
        url: { type: String, default: "https://www.twitch.tv/sagiri" },
    }
})

module.exports = model('centrals', centralSchema)