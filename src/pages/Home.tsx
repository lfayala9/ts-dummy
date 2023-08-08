import { CssBaseline, Grid } from '@mui/material'
import NavBar from '../components/NavBar'
import { TabTitle } from '../hooks/titles'
import UserCard from '../components/UserCard'
import CreatePost from '../components/CreatePost'

const Home: React.FC = () => {
  TabTitle('Fake Social / Home')
  return (
    <>
      <NavBar />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          display={{ xs: 'none', sm: 'block' }}
          md={3.5}
          sx={{
            py: 3,
            px: 2
          }}
        >
        <UserCard />
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          px={2}
        >
          <CreatePost/>
        </Grid>
        <Grid
          item
          display={{ xs: 'none', sm: 'block' }}
          md={3}
          sx={{
            backgroundColor: '#999999'
          }}
        />
      </Grid>
    </>
  )
}

export default Home
