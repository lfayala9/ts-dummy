import { lazy, Suspense, useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@mui/material'
import { TabTitle } from '../utils/hooks/titles'
import { useAppSelector } from '../utils/hooks/selector'
import CreatePost from '../components/Posts/CreatePost'
import LoaderRing from '../components/Widgets/Loader'
const PostsList = lazy(
  async () => await import('../components/Posts/PostsList')
)
const AddUser = lazy(async () => await import('../components/AddBox/AddUser'))
const UserCard = lazy(
  async () => await import('../components/Widgets/UserCard')
)
const Home: React.FC = () => {
  TabTitle('Fake Social / Home')
  const { token } = useAppSelector((state) => state.auth)

  const [isDisplayNone, setIsDisplayNone] = useState(false)

  useEffect(() => {
    const getWidth = window.innerWidth

    if (getWidth < 850) {
      setIsDisplayNone(true)
    } else {
      setIsDisplayNone(false)
    }
  }, [])

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh', mt: 7 }}>
        <CssBaseline />
         <Grid
          item
          display={{ sm: 'flex' }}
          justifyContent="end"
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
          {isDisplayNone
            ? null
            : <Suspense
            fallback={<LoaderRing position="relative" top="10%" left="-30%" />}
          >
            <UserCard />
          </Suspense>}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={5.5}
          px={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CreatePost />
          <Suspense
            fallback={<LoaderRing position="absolute" top="50%" left="50%" />}
          >
            <PostsList token={token} />
          </Suspense>
        </Grid>
        <Grid
          item
          display={{ sm: 'flex' }}
          justifyContent="start"
          alignItems="start"
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
          {isDisplayNone
            ? null
            : <Suspense
            fallback={<LoaderRing position="relative" top="10%" left="30%" />}
          >
            <AddUser />
          </Suspense>}
        </Grid>
      </Grid>
    </>
  )
}

export default Home
