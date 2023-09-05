import { Settings, Logout } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { setLogout } from '../app-state'
import { useAppDispatch } from '../utils/hooks/selector'
import { useState } from 'react'
import SwitchMode from '../components/Widgets/SwitchMode'
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

export const MenuNav = ({
  anchorElFun,
  openFun,
  closeFun,
  id
}: {
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
}): JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <Menu
      anchorEl={anchorElFun}
      id={id}
      open={openFun}
      onClose={closeFun}
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
      <MenuItem onClick={closeFun}>
        <Avatar /> Profile
      </MenuItem>
      <Divider />
      <SwitchMode size="small" />
      <MenuItem onClick={closeFun}>
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
  )
}

export const NotMenu = ({
  anchorElFun,
  openFun,
  closeFun,
  id
}: {
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
}): JSX.Element => {
  const defaultValue = {
    firstName: '',
    lastName: ''
  }
  const [isFriend, setIsFriend] = useState(false)
  const [friendValue, setFriendValue] = useState(defaultValue)
  socket.on('added-friend', (friend) => {
    const newValue = {
      firstName: friend.firstName,
      lastName: friend.lastName
    }
    setIsFriend(true)
    setFriendValue(newValue)
  })
  return (
    <Menu
      anchorEl={anchorElFun}
      id={id}
      open={openFun}
      onClose={() => {
        closeFun()
        setIsFriend(false)
      }}
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
      {isFriend
        ? (
          <MenuItem onClick={closeFun}>
          <ListItemIcon>
            <AddReactionOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {friendValue.firstName} {friendValue.lastName} is your new Friend
        </MenuItem>
          )
        : (
        <Typography mx={2} fontSize="15px" fontWeight="light">
          Nothing here yet
        </Typography>
          )}
    </Menu>
  )
}
