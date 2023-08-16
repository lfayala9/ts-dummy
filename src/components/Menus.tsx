import { PersonAdd, Settings, Logout } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { setLogout } from '../app-state'
import { useAppDispatch } from '../hooks/selector'
import SwitchMode from './SwitchMode'
import Picker from '@emoji-mart/react'

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
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
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
      <Typography mx={2} fontSize="15px" fontWeight="light">
        Nothing here yet
      </Typography>
    </Menu>
  )
}

export const EmojiMenu = ({
  data,
  anchorElFun,
  openFun,
  closeFun,
  id
}: {
  data: any
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
}): JSX.Element => {
  return (
    <Menu
      anchorEl={anchorElFun}
      id={id}
      open={openFun}
      onClose={closeFun}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Picker data={data} />
    </Menu>
  )
}

export const PostMenu = ({
  anchorElFun,
  openFun,
  closeFun,
  id,
  deleteFun
}: {
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
  deleteFun: () => void
}): JSX.Element => {
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
      <MenuItem onClick={deleteFun}>
        <ListItemIcon>
          <DeleteIcon color='error' fontSize="small" />
        </ListItemIcon>
        Delete Post
      </MenuItem>
      <MenuItem onClick={closeFun}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
    </Menu>
  )
}
