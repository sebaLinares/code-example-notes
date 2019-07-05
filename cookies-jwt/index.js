const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')

app.use(express.json())

app.post('/auth/login', (req, res) => {
  const username = req.body.username
  const pwd = req.body.pwd

  if (username !== 'seba' || pwd !== 'lina') {
    res.status(400)
    throw new Error('username or password are not correct')
  }

  res.cookie('access_token', { token: '123' })
  res.send('hi')

  res.status(200).end()
})

app.listen(3000, () => {
  console.log('node app online')
})
