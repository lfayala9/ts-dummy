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
import { ColorRing } from 'react-loader-spinner'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { setIsLoading } from '../app-state'
import { type ChangeEvent, useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/selector'
import { registerSchema } from '../services/userValidation'
import { badSign, registerService } from '../services/register'

const SignIn: React.FC = () => {
  // Hide/Show Password
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }

  const { isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  // Register Service

  const defaultValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: null as File | null
  }

  const [currentErrors, setCurrentErrors] = useState([])
  const [form, setForm] = useState(defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'picture') {
      const file = e.target.files != null ? e.target.files[0] : null
      setForm({ ...form, [e.target.name]: file })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(setIsLoading(true))
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      formData.append(key, value!)
    }
    await registerService(formData).finally(() =>
      dispatch(setIsLoading(false))
    )
    await registerSchema.validate(form, { abortEarly: false }).catch((err) => {
      setCurrentErrors(err.errors)
    })
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                name="firstName"
                autoComplete="given-name"
                label="First Name"
                autoFocus
                required
                fullWidth
                onChange={handleChange}
                value={form.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                name="lastName"
                onChange={handleChange}
                value={form.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="E-mail"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={handleChange}
                  value={form.password}
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
              </FormControl>
              <FormHelperText id="my-helper-text" sx={{ mx: 0 }}>
                Upload your profile Picture *
              </FormHelperText>
              <TextField
                fullWidth
                type="button"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      component="label"
                      sx={{
                        '&:hover': {
                          background: 'none'
                        }
                      }}
                    >
                      <FileUploadOutlined sx={{ mx: '1rem' }} />
                      <input
                        style={{ display: 'block' }}
                        hidden
                        onChange={handleChange}
                        type="file"
                        name="picture"
                        accept="image/*"
                      />
                    </IconButton>
                  )
                }}
              />
            </Grid>
            {currentErrors.map((e) => {
              return (
                <Typography
                  key={e}
                  color="error"
                  sx={{ my: 0.5, mx: 1 }}
                  variant="caption"
                >
                  {e}
                </Typography>
              )
            })}
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
          <Button
            aria-label="submit button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
          >
            Sign Up
          </Button>
          <FormHelperText id="my-helper-text" sx={{ mx: 0, mb: 2 }}>
            * Required
          </FormHelperText>
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
