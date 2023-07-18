import {
  TextField,
  CssBaseline,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'

import { VisibilityOff, Visibility } from '@mui/icons-material'

import { useState } from 'react'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  return (
    <form>
        <CssBaseline/>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <FormControl>
          <TextField required id="outlined-required" label="E-mail" />
          <FormHelperText id="my-helper-text">
            We&apos;ll never share your email.
          </FormHelperText>
          <FormControl sx={{ my: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText id="my-helper-text">
              We&apos;ll never share your password.
            </FormHelperText>
          </FormControl>
        </FormControl>
      </Box>
    </form>
  )
}

export default Login

// import React, { useState } from 'react'
// import { useAppSelector, useAppDispatch } from '../hooks/selector'
// import { loginService } from '../services/login'
// import { Button } from '@mui/material'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import { setMode } from '../app-state/settings'

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const {
//     auth: { isLoading },
//     settings: { theme }
//   } = useAppSelector((state) => state)
//   const dispatch = useAppDispatch()

//   const handleLogin = (e: { preventDefault: () => void }): void => {
//     e.preventDefault()
//     void dispatch(
//       loginService({
//         email,
//         password
//       })
//     )
//   }

//   const changeTheme = (): void => {
//     dispatch(setMode(theme === 'dark' ? 'light' : 'dark'))
//   }
//   return (
//     <>
//     <form noValidate onSubmit={handleLogin} encType="multipart/form-data">
//       <label htmlFor="email">E-mail:</label>
//       <br />
//       <input
//         onChange={(e) => {
//           setEmail(e.target.value)
//         }}
//         type="email"
//         id="email"
//         name="email"
//         placeholder="user@example.com"
//       />
//       <br />
//       <label htmlFor="pwd">Password:</label>
//       <br />
//       <input
//         onChange={(e) => {
//           setPassword(e.target.value)
//         }}
//         placeholder="******"
//         type="password"
//         id="pwd"
//         name="pwd"
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//     {isLoading && 'CARGANDO...'}
//     <Button color='info' onClick={changeTheme} variant='contained'>
//       {theme === 'light' ? <DarkModeIcon/> : <LightModeIcon/> }
//     </Button>
//     </>
//   )
// }

// export default Login
