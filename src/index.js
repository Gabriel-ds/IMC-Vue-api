const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// require('dotenv').config()

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

// Conectando com banco de dados

mongoose.connect(
    'mongodb+srv://gabriel:gabriel123@apicluster.rxse8nc.mongodb.net/bancoapi?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Conectamos ao Mongo DB!!')
        app.listen(3333)
    })
    .catch((err) => console.log(err))



// Definindo schemas

const ImcUserSchema = new mongoose.Schema({ 
    userName: String,
    height: Number,
    weight: Number,
    imcValue: Number,
    situation: String
})
const ImcUser = mongoose.model('ImcUser', ImcUserSchema)


// criar IMC

app.post('/create', async (req, res) => {
    const { userName, height, weight, imcValue, situation } = req.body
    try {
        const newImcUser = await ImcUser.create({ userName, height, weight, imcValue, situation })
        return res.status(200).send(newImcUser)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// listar todos GET

app.get('/search', async (req, res) => {
    try {
        const users = ImcUser.find()
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/todo/:user_id', async (req, res) => {
    const { user_id } = req.params
    try {
        const allTodos = await Todo.find({ user: user_id })
        return res.status(200).send(allTodos)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// atualizar todos PATCH / PUT
app.patch('/todo/:user_id/:todo_id', async (req, res) => {
    const data = req.body
    const { todo_id, user_id } = req.params
    try {
        const belongsToUser = await Todo.findOne({ user: user_id })
        if (!belongsToUser) return res.status(400).send('Operation not allowed')
        const updatedTodo = await Todo.findByIdAndUpdate(todo_id, data, { new: true })
        return res.status(200).send(updatedTodo)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// delete todos DELETE
app.delete('/todo/:user_id/:todo_id', async (req, res) => {
    const { todo_id, user_id } = req.params
    try {
        const belongsToUser = await Todo.findOne({ user: user_id })
        if (!belongsToUser) return res.status(400).send('Operation not allowed')
        const deletedTodo = await Todo.findByIdAndRemove(todo_id)
        return res.status(200).send({
            message: 'Todo deletado com sucesso',
            deletedTodo
        })
    } catch(err) {
        return res.status(400).send(err)
    }
})

// Rodando o projeto

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))