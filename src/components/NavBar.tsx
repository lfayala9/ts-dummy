import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { StyledBadge, MenuNav, NotMenu } from '../styles/components'
import { useAppSelector } from '../hooks/selector'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { useState, type MouseEvent } from 'react'

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

  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null)
  const openNotification = Boolean(anchorElNotification)
  const handleClickNotification = (e: MouseEvent<HTMLElement>): void => {
    setAnchorElNotification(e.currentTarget)
  }
  const handleCloseNotification = (): void => {
    setAnchorElNotification(null)
  }

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton>
            <EmojiPeopleIcon sx={{ fontSize: '2.4rem' }} />
          </IconButton>
          <Typography fontWeight="bold" variant="h3" sx={gradient} flexGrow={1}>
            FakeSocial
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={handleClickNotification}
              aria-controls={openNotification ? 'notification' : undefined}
              aria-haspopup="true"
              aria-expanded={openNotification ? 'true' : undefined}
            >
              <Avatar sx={{ width: '42px', height: '42px' }}>
                <NotificationsIcon />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={handleClickMenu}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                variant="dot"
              >
                <Avatar sx={{ width: '42px', height: '42px' }} src={user?.picture} />
              </StyledBadge>
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
