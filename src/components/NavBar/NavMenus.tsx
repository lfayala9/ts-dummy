import { IconButton, Badge, Avatar } from '@mui/material'
import useMenu from '../../utils/hooks/useMenu'
import { useState, type MouseEvent } from 'react'
import { useAppSelector } from '../../utils/hooks/selector'
import { MenuNav, NotMenu } from './MenuNav'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

export const Menu = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)
  const { anchorEl, openMenu, handleClickMenu, handleCloseMenu } = useMenu()

  return (
    <>
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
            <img
              alt="profile-pic"
              src={user?.picture}
              width={'50px'}
              height={'40px'}
            />
          </Avatar>
        </Badge>
      </IconButton>
      <MenuNav
        id="account-menu"
        anchorElFun={anchorEl}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
    </>
  )
}

export const NotificationMenu = (): JSX.Element => {
  const { anchorEl, setAnchorEl, openMenu, handleCloseMenu } = useMenu()
  const [isNotification, setIsNotification] = useState(false)
  const handleClickMenu = (e: MouseEvent<HTMLElement>): void => {
    setIsNotification(false)
    setAnchorEl(e.currentTarget)
  }

  socket.on('added-friend', () => {
    setIsNotification(true)
  })
  return (
    <>
      <IconButton
        onClick={handleClickMenu}
        aria-controls={openMenu ? 'notification' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        aria-label="Notification Button"
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
      <NotMenu
        id="notification"
        anchorElFun={anchorEl}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
    </>
  )
}
