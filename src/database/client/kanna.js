const { Schema, model } = require('mongoose')

const templateSchema = new Schema({
    _id: String,
    maintenance: {
        status: { type: Boolean, default: false },
        reason: { type: String, default: null },
    }
})

module.exports = model('Kanna', templateSchema)