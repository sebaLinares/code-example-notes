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
    console.log(form)
    event.target.reset()
    axios
      .post('http://localhost:3000/auth/login', {
        method: 'post',
        data: form,
        widthCredentials: true
      })
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
    </div>
  )
}

export default App