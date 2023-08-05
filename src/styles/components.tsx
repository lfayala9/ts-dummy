import { PersonAdd, Settings, Logout } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  styled
} from '@mui/material'
import { setLogout } from '../app-state'
import SwitchMode from '../components/SwitchMode'
import { useAppDispatch } from '../hooks/selector'

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

export const MenuNav = ({ anchorElFun, openFun, closeFun, id }: { anchorElFun: HTMLElement | null, openFun: boolean, closeFun: () => void, id: string }): JSX.Element => {
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

export const NotMenu = ({ anchorElFun, openFun, closeFun, id }: { anchorElFun: HTMLElement | null, openFun: boolean, closeFun: () => void, id: string }): JSX.Element => {
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
        <Typography mx={2} fontSize='15px' fontWeight='light'>
          Nothing here yet
        </Typography>
      </Menu>
  )
}
