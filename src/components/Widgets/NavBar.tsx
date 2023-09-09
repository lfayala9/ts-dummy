import {
  AppBar,
  Avatar,
  IconButton,
  Badge,
  Stack,
  Toolbar,
  Typography,
  Link
} from '@mui/material'
import { MenuNav, NotMenu } from '../../containers/MenuNav'
import { useAppSelector } from '../../utils/hooks/selector'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { useState, type MouseEvent } from 'react'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

const NavBar: React.FC = () => {
  // theme settings
  const { user } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.settings)
  const gradient = {
    backgroundImage:
      theme === 'light'
        ? 'linear-gradient(to right bottom, #dfd7f4, #35a2ca)'
        : 'linear-gradient(to right bottom, #9a36d9, #284195)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }

  // Menu Settings

  const [anchorElMenu, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorElMenu)
  const handleClickMenu = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseMenu = (): void => {
    setAnchorEl(null)
  }

  const [isNotification, setIsNotification] = useState(false)
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null)
  const openNotification = Boolean(anchorElNotification)
  const handleClickNotification = (e: MouseEvent<HTMLElement>): void => {
    setAnchorElNotification(e.currentTarget)
    setIsNotification(false)
  }
  const handleCloseNotification = (): void => {
    setAnchorElNotification(null)
  }
  socket.on('added-friend', () => {
    setIsNotification(true)
  })
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Link href={'/home'}>
            <IconButton aria-label='Navigation button to go to main page'>
              <EmojiPeopleIcon sx={{ fontSize: '2.4rem' }} />
            </IconButton>
          </Link>
          <Typography className='titleNav' fontWeight="bold" variant="h3" sx={gradient} flexGrow={1}>
            FakeSocial
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={handleClickNotification}
              aria-controls={openNotification ? 'notification' : undefined}
              aria-haspopup="true"
              aria-expanded={openNotification ? 'true' : undefined}
              aria-label='Notification Button'
            >
              <Badge
                color={isNotification ? 'warning' : 'default'}
                variant="dot"
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <Avatar>
                  <NotificationsIcon sx={{ color: 'black' }} />
                </Avatar>
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleClickMenu}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <Badge
                color="success"
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                variant="dot"
              >
                <Avatar>
                  <img alt='profile-pic' src={user?.picture} width={'40px'} height={'auto'}/>
                </Avatar>
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <MenuNav
        id="account-menu"
        anchorElFun={anchorElMenu}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
      <NotMenu
        id="notification"
        anchorElFun={anchorElNotification}
        openFun={openNotification}
        closeFun={handleCloseNotification}
      />
    </>
  )
}

export default NavBar
