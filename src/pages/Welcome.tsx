import {
  Modal,
  CssBaseline,
  Grid,
  Button,
  Box,
  Typography
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { setMode } from '../app-state/settings'
import { useAppDispatch, useAppSelector } from '../hooks/selector'
import { useState } from 'react'
import Login from '../components/Login'
import SignIn from '../components/SignIn'

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

  const {
    settings: { theme }
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 430,
    bgcolor: theme === 'light' ? '#fafafa' : '#050505',
    border: theme === 'light' ? '2px solid #000' : '2px solid #fafafa',
    borderRadius: '2rem',
    boxShadow: 24,
    p: 4
  }

  const changeTheme = (): void => {
    dispatch(setMode(theme === 'dark' ? 'light' : 'dark'))
  }

  return (
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
          backgroundImage: 'url(src/assets/background1.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100vw 100vh'
        }}
      >
      </Grid>
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
          <Typography fontWeight="normal" variant="h4" sx={{ mb: 2, mx: 1 }}>
            Join Today
          </Typography>
          <Button
            color="primary"
            variant="contained"
            sx={{ borderRadius: '10rem', px: 10, mb: 3 }}
            onClick={handleOpenSignIn}
          >
            Create An Account
          </Button>
          <Typography fontWeight="normal" variant="h5" sx={{ mb: 2, mx: 1 }}>
            Already Have an Account?
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: '10rem', px: 16, mb: 3 }}
            onClick={handleOpenLogin}
          >
            Log In
          </Button>
          <Modal
            open={open.show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {open.show && open.component === 'login' ? <Login /> : <SignIn />}
            </Box>
          </Modal>
          <Button
            size="large"
            onClick={changeTheme}
            color="info"
            variant="contained"
            sx={{ borderRadius: '10rem', py: 2 }}
          >
            {theme === 'light'
              ? (
              <DarkModeIcon sx={{ fontSize: '1.6rem' }} />
                )
              : (
              <LightModeIcon sx={{ fontSize: '1.6rem' }} />
                )}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Welcome
