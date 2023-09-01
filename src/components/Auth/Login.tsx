import {
  CssBaseline,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography
} from '@mui/material'
import './styles.css'
import { PassWordInput, TextInput } from './AuthInputs'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/selector'
import { loginService, badLog } from '../../services/login'
import { type SetStateAction, useState } from 'react'
import LoaderRing from '../Widgets/Loader'

const Login: React.FC = () => {
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
          <TextInput changeFun={(e: { target: { value: SetStateAction<string> } }) => {
            setEmail(e.target.value)
          }} id='outlined-required' label='E-mail'/>
          <FormHelperText id="my-helper-text" sx={{ mx: 0 }}>
            We&apos;ll never share your email.
          </FormHelperText>
          <FormControl sx={{ my: 1 }} variant="outlined">
          <PassWordInput changeFun={(e: { target: { value: SetStateAction<string> } }) => {
            setPassword(e.target.value)
          }}/>
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
