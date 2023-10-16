import {
  CssBaseline,
  Grid,
  Button,
  Box,
  Typography,
  FormHelperText,
  Link
} from '@mui/material'
import SwitchMode from '../components/Widgets/SwitchMode'
import { useAppSelector } from '../utils/hooks/selector'
import { useState } from 'react'
import '../styles/globals.css'
import Login from '../components/Auth/Login'
import SignIn from '../components/Auth/SignIn'
import Modals from '../containers/Modals'
import { Helmet } from 'react-helmet-async'
import ExampleLog from '../components/Auth/ExampleLog'

const Welcome: React.FC = () => {
  const { theme } = useAppSelector((state) => state.settings)
  const [open, setOpen] = useState({ show: false, component: '' })
  const handleOpenLogin = (): void => {
    setOpen({ show: true, component: 'login' })
  }
  const handleOpenSignIn = (): void => {
    setOpen({ show: true, component: 'sign' })
  }
  const handleClose = (): void => {
    setOpen({ show: false, component: '' })
  }

  return (
    <>
      <Helmet>
        <title>Fake Social | Welcome</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Welcome Page" />
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          display={{ xs: 'none', sm: 'block' }}
          sm={4}
          md={6}
          lg={7}
          xl={8}
          sx={{
            backgroundColor: '#999999',
            backgroundImage: 'url(/background1.webp)',
            backgroundRepeat: 'repeat',
            backgroundSize: '100vw 100vh'
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            className="button-cont"
            sx={{
              my: 5,
              mx: 4
            }}
          >
            <Typography fontWeight="normal" variant="h1" sx={{ mb: 7 }}>
              This is what&apos;s{' '}
              <span
                className="welcome-text"
                style={{
                  backgroundImage:
                    theme === 'light'
                      ? 'linear-gradient(to right bottom, #9a36d9, #284195)'
                      : 'linear-gradient(to right bottom, #284195, #86c7df)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                happening
              </span>
            </Typography>
            <Box>
              <Typography
                fontWeight="normal"
                variant="h2"
                sx={{ mb: 2, mx: 1 }}
              >
                Join Today
              </Typography>
              <Button
                aria-label="Create An Account button to sign in"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ borderRadius: '10rem', mb: 3 }}
                onClick={handleOpenSignIn}
              >
                Create An Account
              </Button>
              <Typography
                fontWeight="normal"
                variant="h3"
                sx={{ mb: 2, mx: 1 }}
              >
                Log as an example user
              </Typography>
              <ExampleLog />
              <Typography
                fontWeight="normal"
                variant="h3"
                sx={{ mb: 2, mx: 1 }}
              >
                Already Have an Account?
              </Typography>
              <Button
                aria-label="Log In button to log into the app"
                color="secondary"
                fullWidth
                variant="contained"
                sx={{ borderRadius: '10rem', mb: 3 }}
                onClick={handleOpenLogin}
              >
                Log In
              </Button>
              <SwitchMode size="normal" />
            </Box>
            <Modals
              openFun={open.show}
              handleClose={handleClose}
              size={350}
              pySize={4}
              pxSize={1}
            >
              {open.show && open.component === 'login' ? <Login /> : <SignIn />}
            </Modals>
            <Box display="flex" gap={2}>
              <FormHelperText sx={{ mt: 2 }}>
                © 2023 Fake Company
              </FormHelperText>
              <Link
                href={'https://github.com/lfayala9'}
                target="_blank"
                underline="hover"
                color="inherit"
                fontWeight="light"
              >
                <FormHelperText sx={{ mt: 2 }}>♡ Made by Luis</FormHelperText>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Welcome
