const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')
const JWT = require('jsonwebtoken')
// Parses the cookie header and populates `req.cookies` with the content
const cookieParser = require('cookie-parser')
const cors = require('cors')

const SECRET = 'shhh'

// Add middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    // for cookies and so on
    credentials: true
  })
)

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

  res.status(200).end()
})

app.use('/api/users/', (req, res) => {
  const token = req.cookies.access_token

  // If this fails it will throw an error
  try {
    const decoded = JWT.verify(token, SECRET)
  } catch (err) {
    res.status(400)
    throw err
  }

  res.status(200).json(usuarios)
})

app.use((err, req, res, enxt) => {
  res.json(err)
})

app.listen(3000, () => {
  console.log('node app online')
})
