import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../hooks/selector'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
// import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { setLogout } from '../app-state'
import { useState, type MouseEvent } from 'react'
import SwitchMode from './SwitchMode'

const NavBar: React.FC = () => {
  // theme settings
  const {
    auth: { picture },
    settings: { theme }
  } = useAppSelector((state) => state)

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  // Logout

  const dispatch = useAppDispatch()
  console.log(picture)

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton>
            <EmojiPeopleIcon sx={{ fontSize: '2.4rem' }} />
          </IconButton>
          <Typography fontWeight="bold" variant="h4" sx={gradient} flexGrow={1}>
            FakeSocial
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: '46px', height: '46px' }}>
              <img style={{ width: '46px', height: '46px', borderRadius: '50px' }} src={picture} />
              </Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <SwitchMode size="small" />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default NavBar
