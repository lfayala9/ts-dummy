import { CssBaseline, Grid, Button, Box, Typography } from '@mui/material'
import SwitchMode from '../components/Widgets/SwitchMode'
import { useAppSelector } from '../utils/hooks/selector'
import { useState } from 'react'
import Login from '../components/Auth/Login'
import SignIn from '../components/Auth/SignIn'
import Modals from '../containers/Modals'
import { Helmet } from 'react-helmet-async'

const Welcome: React.FC = () => {
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

  const { theme } = useAppSelector((state) => state.settings)

  return (
    <>
      <Helmet>
        <title>Fake Social | Welcome</title>
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
            backgroundRepeat: 'no-repeat',
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
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start'
            }}
          >
            <Typography fontWeight="normal" variant="h1" sx={{ mb: 7 }}>
              This is what&apos;s{' '}
              <span
                style={{
                  fontWeight: 'normal',
                  paddingBottom: '0.5rem',
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
            <Typography fontWeight="normal" variant="h2" sx={{ mb: 2, mx: 1 }}>
              Join Today
            </Typography>
            <Button
              aria-label="Create An Account button to sign in"
              color="primary"
              variant="contained"
              sx={{ borderRadius: '10rem', px: 10, mb: 3 }}
              onClick={handleOpenSignIn}
            >
              Create An Account
            </Button>
            <Typography fontWeight="normal" variant="h3" sx={{ mb: 2, mx: 1 }}>
              Already Have an Account?
            </Typography>
            <Button
              aria-label="Log In button to log into the app"
              color="secondary"
              variant="contained"
              sx={{ borderRadius: '10rem', px: 16, mb: 3 }}
              onClick={handleOpenLogin}
            >
              Log In
            </Button>
            <Modals openFun={open.show} handleClose={handleClose} size={350}>
              {open.show && open.component === 'login' ? <Login /> : <SignIn />}
            </Modals>
            <SwitchMode size="normal" />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Welcome
