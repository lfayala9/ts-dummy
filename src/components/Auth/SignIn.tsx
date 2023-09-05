import {
  TextField,
  CssBaseline,
  Box,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  IconButton,
  Typography
} from '@mui/material'
import './styles.css'
import { PassWordInput, TextInput } from './AuthInputs'
import LoaderRing from '../Widgets/Loader'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import { setIsLoading } from '../../app-state'
import { type ChangeEvent, useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/selector'
import { registerSchema } from '../../services/userValidation'
import { badSign, registerService } from '../../services/register'

const SignIn: React.FC = () => {
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
    e?.preventDefault()
    dispatch(setIsLoading(true))
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    }
    const valid = await registerSchema.isValid(form)
    if (valid) {
      await registerService(formData).finally(() =>
        dispatch(setIsLoading(false))
      )
    } else {
      dispatch(setIsLoading(false))
    }
    await registerSchema.validate(form, { abortEarly: false }).catch((err) => {
      setCurrentErrors(err.errors)
    })
  }
  return (
    <form noValidate onSubmit={(e) => { void handleSubmit(e) }} encType="multipart/form-data">
      <CssBaseline />
      <Box className="auth-modal">
        <FormControl>
          <Grid container spacing={1}>
            <Typography fontWeight="normal" variant="h3" sx={{ mb: 2, mx: 1 }}>
              Join the experience!
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextInput
                changeFun={handleChange}
                name="firstName"
                autoComplete="given-name"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                label="Last Name"
                autoComplete="family-name"
                name="lastName"
                changeFun={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="E-mail"
                name="email"
                changeFun={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth>
                <PassWordInput changeFun={handleChange} />
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
            <Typography color="green" sx={{ my: 1 }}>
              Account Created Successfully
            </Typography>
              )
            : null}
          {isLoading && <LoaderRing position="relative" top="50%" left="40%" />}
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
