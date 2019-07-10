const express = require('express')
const app = express()
const usuarios = require('./usuarios.json')
const JWT = require('jsonwebtoken')
// Parses the cookie header and populates `req.cookies` with the content
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Global variables
const SECRET = 'shhh'
const { PORT = 3000, NODE_ENV = 'development' } = process.env

// Middlewares
app.use(express.json())
app.use(cookieParser())
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Origin', req.headers.origin)
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
//   )
//   res.header(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//   )
//   next()
// })

app.use(
  cors({
    // origin: 'http://localhost:3006'
    // credentials: true
  })
)

// app.use((req, res, next) => {
//   res.set({
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
//     Accept: 'application/json',
//     'Content-type': 'application/json',
//     'Access-Control-Allow-Credentials': true,
//     'Access-Control-Allow-Origin': req.headers.origin,
//     'Access-Control-Allow-Headers':
//       'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//   })
//   next()
// })

app.post('/auth/login', (req, res) => {
  console.log('entered /auth/login')

  // Retrieve from request.body
  const username = req.body.username
  const pwd = req.body.pwd

  console.log('username and pwd set')
  // Auth validatation
  if (username !== 'seba' || pwd !== 'lina') {
    res.status(400)
    throw new Error('username or password are not correct')
  }

  console.log('validation ok')
  // What I want in the token
  const payload = {
    _id: 'ASDFjcxxjsoidrasd'
  }

  console.log('payload ok')

  // Generate token with payload
  const token = JWT.sign(payload, SECRET)

  console.log('token ok')
  // name of the cookie = access_token; content of the cookie = token
  res.cookie('access_token', token, {
    // expiration date for the cookie, in secs
    maxAge: 1000 * 60 * 60,
    // js can't access the cookie
    httpOnly: true
  })

  console.log('cookie sent')
  console.log(token)

  res.status(200).end()
})

app.use('/api/users', (req, res) => {
  console.log('/api/users')
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

app.use('/api/hola', (req, res) => {
  console.log('api/hola')
  res.send('hola')
})

app.use((err, req, res, enxt) => {
  res.json(err)
})

app.listen(3000, () => {
  console.log(`Server started in port: ${PORT}`)
})
