import {
  TextField,
  CssBaseline,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  return (
    <form action="">
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
        <Grid container>
        <Typography fontWeight='normal' variant='h3' sx={{ mb: 2, mx: 1 }}>Join the experience!</Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              sx={{ pr: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
          <TextField required fullWidth id="outlined-required" label="E-mail" sx={{ my: 1 }} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
            fullWidth
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
            <FormHelperText id="my-helper-text" sx={{ mb: 2, mx: 0 }}>
              We&apos;ll never share your password.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Typography variant='h5' sx={{ mx: 0 }}>
              By creating an account you accept our <span style={{ color: '#284195', textDecoration: 'underline' }}>terms and conditions</span>
        </Typography>
        </FormControl>
      </Box>
    </form>
  )
}

export default SignIn
