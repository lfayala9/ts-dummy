import {
  TextField,
  CssBaseline,
  Box,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { badSign, registerService } from '../services/register'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useAppSelector, useAppDispatch } from '../hooks/selector'

const SignIn: React.FC = () => {
  // Hide/Show Password

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  // Register user Service

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setName] = useState('')
  const [lastName, setLastName] = useState('')

  const {
    auth: { isLoading }
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const handleSignIn = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    void dispatch(
      registerService({
        email,
        password,
        firstName,
        lastName
      })
    )
  }

  return (
    <form noValidate onSubmit={handleSignIn} encType="multipart/form-data">
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
          <Grid container spacing={1}>
            <Typography fontWeight="normal" variant="h3" sx={{ mb: 2, mx: 1 }}>
              Join the experience!
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => {
                  setName(e.target.value)
                }}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
                fullWidth
                id="outlined-required"
                label="E-mail"
                sx={{ mb: 1 }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                fullWidth
                required
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
              <FormHelperText id="my-helper-text" sx={{ mb: 1, mx: 0 }}>
                We&apos;ll never share your password.
              </FormHelperText>
              <FormHelperText id="my-helper-text" sx={{ mx: 0 }}>
                * Required
              </FormHelperText>
            </FormControl>
            <Button aria-label='submit button' type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
              Sign Up
            </Button>
            {badSign.err
              ? (
              <Typography color="error" fontWeight="bold" sx={{ my: 1 }}>
                {badSign.message}
              </Typography>
                )
              : null}
            {badSign.success ?? false
              ? (
              <Typography fontWeight="bold" color="green" sx={{ my: 1 }}>
                Account Created Successfully
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
          </Grid>
          <Typography variant="h5" sx={{ mx: 0 }}>
            By creating an account you accept our{' '}
            <span
              style={{
                color: '#284195',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              terms and conditions
            </span>
          </Typography>
        </FormControl>
      </Box>
    </form>
  )
}

export default SignIn
