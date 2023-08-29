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
import './styles.css'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/selector'
import { loginService, badLog } from '../../services/login'
import { useState } from 'react'
import LoaderRing from '../Widgets/Loader'

const Login: React.FC = () => {
  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  // Login Service

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading } = useAppSelector((state) => state.auth)
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
      <Box className="auth-modal">
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
          <Button
            aria-label="submit button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
          >
            Log in
          </Button>
          {badLog.err
            ? (
            <Typography color="error" fontWeight="bold" sx={{ my: 1 }}>
              {badLog.message}
            </Typography>
              )
            : null}
          {isLoading && <LoaderRing position="relative" top="50%" left="40%" />}
          <a style={{ color: '#284195' }} href="">
            Forgot your password?
          </a>
        </FormControl>
      </Box>
    </form>
  )
}

export default Login