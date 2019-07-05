const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')
const JWT = require('jsonwebtoken')

const SECRET = 'shhh'

app.use(express.json())

app.post('/auth/login', (req, res) => {
  const username = req.body.username
  const pwd = req.body.pwd

  if (username !== 'seba' || pwd !== 'lina') {
    res.status(400)
    throw new Error('username or password are not correct')
  }

  const payload = {
    _id: 'ASDFjcxxjsoidrasd'
  }

  const token = JWT.sign(payload, SECRET)

  res.cookie('access_token', token, {
    // expiration date for the cookie, in secs
    maxAge: 3600,
    // js can't access the cookie
    httOnly: true
  })
  res.send('hi')

  res.status(200).end()
})

app.use('/api/users', (req, res) => {

}

app.listen(3000, () => {
  console.log('node app online')
})
