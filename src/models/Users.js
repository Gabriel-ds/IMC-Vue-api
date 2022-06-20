const mongoose = require('mongoose')

const ImcUser = mongoose.model('ImcUser', {
    userName: String,
    height: Number,
    weight: Number,
    imcValue: Number,
    situation: String
})

module.exports = ImcUser