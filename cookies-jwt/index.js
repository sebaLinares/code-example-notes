const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')
const JWT = require('jsonwebtoken')
// Parses the cookie header and populates `req.cookies` with the content
const cookieParser = require('cookie-parser')

const SECRET = 'shhh'

app.use(express.json())
app.use(cookieParser())

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

  // name of the cookie = access_token; content of the cookie = token
  res.cookie('access_token', token, {
    // expiration date for the cookie, in secs
    maxAge: 3600,
    // js can't access the cookie
    httOnly: true
  })

  // res.send(req.cookies.access_token)
  res.send(cookieParser.JSONCookie(req.cookies.access_token))

  res.status(200).end()
})

app.use('/cookie', (req, res) => {
  console.log(req.cookies['access_token'])
})

app.use('/api/users/', (req, res) => {
  const token = req.cookies.access_token

  // If this fails it will throw an error
  const decoded = JWT.verify(token, SECRET)

  res.status(200).json(usuarios)
})

app.listen(3000, () => {
  console.log('node app online')
})
