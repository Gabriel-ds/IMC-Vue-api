const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const ImcUser = require('./models/Users')

const app = express()

app.use(express.json())
app.use(cors())

// Conectando com banco de dados

mongoose.connect(
    'mongodb+srv://gabriel:gabriel123@apicluster.rxse8nc.mongodb.net/bancoapi?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('MongoDB connect!')
        app.listen(3333)
    })
    .catch((err) => console.log(err))


// Criar IMC
app.post('/', async (req, res) => {
    const { userName, height, weight, imcValue, situation } = req.body
    try {
        const newImcUser = await ImcUser.create({ userName, height, weight, imcValue, situation })
        return res.status(200).send(newImcUser)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// Listar IMC
app.get('/', async (req, res) => {
    try {
        const users = await ImcUser.find()
        return res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Deletar IMC
app.delete('/:imcuser_id', async (req, res) => {
    const { imcuser_id } = req.params
    try {
        const deleteImc = await ImcUser.findByIdAndRemove(imcuser_id)
        return res.status(200).send({
            message: 'IMC deletado com sucesso!',
            deleteImc
        })
    } catch (err) {
        return res.status(400).send(err)
    }
})
