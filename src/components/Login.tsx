import {
  TextField,
  CssBaseline,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material'
import { ColorRing } from 'react-loader-spinner'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../hooks/selector'
import { loginService, badLog } from '../services/login'
import { useState } from 'react'

const Login: React.FC = () => {
  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  // Login Service

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    auth: { isLoading }
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const handleLogin = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    void dispatch(
      loginService({
        email,
        password
      })
    )
  }

  return (
    <form noValidate onSubmit={handleLogin} encType="multipart/form-data">
      <CssBaseline />
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <FormControl>
          <Typography fontWeight="normal" variant="h3" sx={{ mb: 2, mx: 1 }}>
            Welcome Back!
          </Typography>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            id="outlined-required"
            label="E-mail"
          />
          <FormHelperText id="my-helper-text" sx={{ mx: 0 }}>
            We&apos;ll never share your email.
          </FormHelperText>
          <FormControl sx={{ my: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => {
                setPassword(e.target.value)
              }}
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
            <FormHelperText id="my-helper-text" sx={{ mx: 0 }}>
              We&apos;ll never share your password.
            </FormHelperText>
          </FormControl>
          <Button aria-label='submit button' type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Log in
          </Button>
          {badLog.err
            ? (
            <Typography color="error" fontWeight="bold" sx={{ my: 1 }}>
              {badLog.message}
            </Typography>
              )
            : null}
          {isLoading && (
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#284195', '#dfd7f4', '#130b28', '#9a36d9', '#130b28']}
            />
          )}
          <a style={{ color: '#284195' }} href="">
            Forgot your password?
          </a>
        </FormControl>
      </Box>
    </form>
  )
}

export default Login
