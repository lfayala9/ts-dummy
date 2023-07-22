import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Button, ListItemIcon, MenuItem } from '@mui/material'
import { setMode } from '../app-state/settings'
import { useAppDispatch, useAppSelector } from '../hooks/selector'

interface Prop {
  size: string
}

const SwitchMode = ({ size }: Prop): JSX.Element => {
  const {
    settings: { theme }
  } = useAppSelector((state) => state)

  const changeTheme = (): void => {
    dispatch(setMode(theme === 'dark' ? 'light' : 'dark'))
  }
  const dispatch = useAppDispatch()
  return (
    <>
      {size === 'normal'
        ? (
        <Button
          size="large"
          onClick={changeTheme}
          color="info"
          variant="contained"
          sx={{ borderRadius: '10rem', py: 2, mb: 1 }}
        >
          {theme === 'light'
            ? (
            <DarkModeIcon sx={{ fontSize: '1.6rem' }} />
              )
            : (
            <LightModeIcon sx={{ fontSize: '1.6rem' }} />
              )}
        </Button>
          )
        : (
        <MenuItem onClick={changeTheme}>
          {theme === 'light'
            ? (
            <>
              <ListItemIcon>
                <DarkModeIcon color='info' fontSize="small" />
              </ListItemIcon>
              Dark Mode
            </>
              )
            : (
            <>
              <ListItemIcon>
                <LightModeIcon color='info' fontSize="small" />
              </ListItemIcon>
              Light Mode
            </>
              )}
        </MenuItem>
          )}
    </>
  )
}
export default SwitchMode
