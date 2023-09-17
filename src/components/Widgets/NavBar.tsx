import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Link
} from '@mui/material'
import { useAppSelector } from '../../utils/hooks/selector'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { Menu, NotificationMenu } from './NavMenus'

const NavBar: React.FC = () => {
  // theme settings
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
            <NotificationMenu/>
            <Menu/>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar
