import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column'
  }

  const [form, setForm] = useState({})

  const onSubmit = event => {
    event.preventDefault()
    console.log(JSON.stringify(form))
    event.target.reset()
    console.log('calling /auth/login')
    axios
      .post('http://localhost:3000/auth/login', {
        data: form,
        widthCredentials: true
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // const url = 'http://localhost:3000/auth/login'
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(form),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     credentials: 'include'
    //   }
    // }

    // fetch(url, options).then(data => console.log(data))
  }

  const apiCall = () => {
    console.log('calling /api/users/')
    axios
      .get('http://localhost:3000/api/users')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const apiHola = () => {
    console.log('calling /api/hola')
    axios
      .get('http://localhost:3000/api/hola')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const onChangeHandler = e => {
    let updatedForm = { ...form }
    updatedForm[e.target.name] = e.target.value
    setForm(updatedForm)
    console.log(form)
  }

  return (
    <div className="App" style={formStyle}>
      <h1>Login</h1>
      <form style={formStyle} onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={onChangeHandler}
          name="username"
          placeholder="Your username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={onChangeHandler}
          name="pwd"
          placeholder="Your password"
        />
        <input type="submit" value="Send!" />
      </form>
      <button onClick={apiCall}>api call</button>
      <button onClick={apiHola}>Api hola</button>
    </div>
  )
}

export default App
