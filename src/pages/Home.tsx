import { CssBaseline, Grid } from '@mui/material'
import NavBar from '../components/NavBar'
import { TabTitle } from '../hooks/titles'
import UserCard from '../components/UserCard'

const Home: React.FC = () => {
  TabTitle('Fake Social / Home')
  return (
    <>
      <NavBar />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          display={{ xs: 'none', sm: 'flex' }}
          md={3.5}
          sx={{
            py: 4,
            px: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <UserCard />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#444444'
          }}
        >
          C
        </Grid>
        <Grid
          item
          display={{ xs: 'none', sm: 'block' }}
          md={2.5}
          sx={{
            backgroundColor: '#999999'
          }}
        />
      </Grid>
    </>
  )
}

export default Home
