// const ImcUserSchema = new mongoose.Schema({ 
//     userName: String,
//     height: Number,
//     weight: Number,
//     imcValue: Number,
//     situation: String
// })
// const ImcUser = mongoose.model('ImcUser', ImcUserSchema)

const mongoose = require('mongoose')

const ImcUser = mongoose.model('ImcUser', {
    userName: String,
    height: Number,
    weight: Number,
    imcValue: Number,
    situation: String
})

module.exports = ImcUser