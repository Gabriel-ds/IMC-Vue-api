const mongoose = require('mongoose')

const ImcUser = mongoose.model('ImcUser', {
    userName: String,
    height: Number,
    weight: Number,
    imcValue: Number,
    situation: String,
    title: String,
    text: String,
    icon: String,
    footer: String
})

module.exports = ImcUser