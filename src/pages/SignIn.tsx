import React, { useState } from 'react'
import registerService from '../services/register'
import { Button } from '@mui/material'

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [picturePath, setPicturePath] = useState('')

  const handleSignIn = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    void registerService({
      email,
      password,
      firstName,
      lastName
    })
  }
  return (
    <>
      <form noValidate onSubmit={handleSignIn} encType="multipart/form-data">
        <label htmlFor="fname">First Name:</label>
        <br />
        <input
          onChange={(e) => { setName(e.target.value) }}
          placeholder="John"
          type="text"
          id="fname"
          name="fname"
        />
        <br />
        <label htmlFor="last-name">Last Name:</label>
        <br />
        <input
          onChange={(e) => { setLastName(e.target.value) }}
          placeholder="Doe"
          type="text"
          id="last-name"
          name="last-name"
        />
        <br />
        <label htmlFor="email">E-mail:</label>
        <br />
        <input
          onChange={(e) => { setEmail(e.target.value) }}
          type="email"
          id="email"
          name="email"
          placeholder="user@example.com"
        />
        <br />
        <label htmlFor="pwd">Password:</label>
        <br />
        <input
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="******"
          type="password"
          id="pwd"
          name="pwd"
        />
        {/* <input
          onChange={(e) => { setPicturePath(e.target.value) }}
          type="file"
          name="avatar"
        /> */}
        <Button variant='contained' type="submit">Sign Up</Button>
      </form>
    </>
  )
}
