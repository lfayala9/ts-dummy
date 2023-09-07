import { CssBaseline, Grid } from '@mui/material'
import { TabTitle } from '../utils/hooks/titles'
import UserCard from '../components/Widgets/UserCard'
import CreatePost from '../components/Posts/CreatePost'
import PostsList from '../components/Posts/PostsList'
import AddUser from '../components/AddBox/AddUser'

const Home: React.FC = () => {
  TabTitle('Fake Social / Home')
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh', mt: 7 }}>
        <CssBaseline />
        <Grid
          item
          display={{ xs: 'none', sm: 'flex' }}
          justifyContent='end'
          md={4}
          lg={3.5}
          sx={{
            py: 3,
            px: 2,
            '@media (max-width: 850px)': {
              display: 'none'
            }
          }}
        >
        <UserCard />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={5.5}
          px={2}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <CreatePost/>
          <PostsList/>
        </Grid>
        <Grid
          item
          display={{ xs: 'none', sm: 'flex' }}
          justifyContent='start'
          alignItems='start'
          lg={3}
          md={0}
          sx={{
            '@media (max-width: 1100px)': {
              display: 'none'
            },
            '@media (max-width: 1400px)': {
              px: 1.5
            },
            '@media (min-width: 1920px)': {
              pr: 8
            }
          }}
        >
          <AddUser/>
          </Grid>
      </Grid>
    </>
  )
}

export default Home
