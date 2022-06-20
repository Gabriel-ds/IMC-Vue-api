const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ImcUser = require("./models/Users");

const app = express();

app.use(express.json());
app.use(cors());

// Conectando com banco de dados
const PORT = process.env.PORT || 3333;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connect!");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

// Criar IMC
app.post("/", async (req, res) => {
  const { userName, height, weight, imcValue, situation, title, text, icon, footer } =
    req.body;
  const imc = (weight / (height * height)).toFixed(0);
  console.log(imc);

  let alert = {}

  if (imc >= 30) {
    alert = {
        title: `Cuidado, ${userName} !! 😮`,
        message: `O seu IMC é de ${imc}!! Você está acima do peso!`,
        icon: 'warning',
        footer: '<a href="https://vitat.com.br/imc-saudavel/" target="_blank">Clique aqui e veja como melhorar o seu IMC</a>',
    }
  } else if(imc < 18) {
    alert = {
        title: `Cuidado, ${userName} !! 😮`,
        message: `O seu IMC é de ${imc}. Você está abaixo do ideal!`,
        icon: 'warning',
        footer: '<a href="https://vitat.com.br/imc-saudavel/" target="_blank">Clique aqui e veja como melhorar o seu IMC</a>'
    }} else {
        alert = {
            title: `Parabéns, ${userName} !! 👏`,
            message: `O seu IMC é de ${imc}! Você está no peso ideal!`,
            icon: 'success',
            footer: ''
        }}

  console.log(alert)

  try {
    const newImcUser = await ImcUser.create({
      userName,
      height,
      weight,
      imcValue: imc,
      situation,
      title: alert.title,
      text: alert.message,
      icon: alert.icon,
      footer: alert.footer
    });
    return res.status(200).send(newImcUser);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Listar IMC
app.get("/", async (req, res) => {
  try {
    const users = await ImcUser.find();
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletar IMC
app.delete("/:imcuser_id", async (req, res) => {
  const { imcuser_id } = req.params;
  try {
    const deleteImc = await ImcUser.findByIdAndRemove(imcuser_id);
    return res.status(200).send({
      message: "IMC deletado com sucesso!",
      deleteImc,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});
