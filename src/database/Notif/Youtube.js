const { Schema, model } = require('mongoose')

const templateSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
})

module.exports = model('Youtubes', templateSchema)