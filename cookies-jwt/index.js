const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')

// app.use(express.json())

app.post('/auth/login', (req, res) => {
  const username = req.body.username
  const pwd = req.body.pwd
  res.send(JSON.parse(req.body))
  console.log(`username: ${username} and pwd: ${pwd}`)
})

const objeto = {
  name: 'lala',
  poto: 'caca'
}

app.use('/json', (req, res) => {
  // res.json(typeof usuarios[6])
  res.json({ flavio: 'flavio' })
})

app.use('/send', (req, res) => {
  // res.send(typeof usuarios[6])
  res.send({ flavio: 'flavio' })
})

app.listen(3000, () => {
  console.log('node app online')
})
