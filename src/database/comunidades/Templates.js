const { Schema, model } = require('mongoose')

const templateSchema = new Schema({
    _id: String,
    by: { type: String, default: null },
    templates: { type: Array, default: [] },
    
})

module.exports = model('templates', templateSchema)