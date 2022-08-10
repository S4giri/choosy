const { Schema, model } = require('mongoose')

const amongSchema = new Schema({
    _id: String
})

module.exports = model('amongus', amongSchema)