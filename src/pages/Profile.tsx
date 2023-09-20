import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Wrapper } from '../styles/components'
import {
  Grid,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  FormHelperText,
  Divider
} from '@mui/material'
import { useAppSelector } from '../utils/hooks/selector'
import { useParams } from 'react-router-dom'
import { getUser } from '../utils/hooks/useGetUser'
import { type UserInfo } from '../types'
import { Helmet } from 'react-helmet-async'
import { TabTitle } from '../utils/hooks/titles'
import PostsList from '../components/Posts/PostsList'
import LoaderRing from '../components/Widgets/Loader'
import { useDisplay } from '../utils/hooks/display'
const AddUser = lazy(async () => await import('../components/AddBox/AddUser'))

const Profile: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.settings)
  const { userId } = useParams()
  const { isDisplayNone } = useDisplay()

  const [user, setUser] = useState<UserInfo>()
  useEffect(() => {
    const userData = getUser(token, userId)
    const getData = async (): Promise<void> => {
      setUser(await userData)
    }
    void getData()
  }, [])
  TabTitle(
    `Profile | ${user != null ? user.firstName : ''} ${
      user != null ? user.lastName : ''
    }`
  )
  const date = new Date(user?.createdAt as string)
  return (
    <>
      <Helmet>
        <meta name="description" content="Profile Page" />
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh', mt: 7 }}>
        <CssBaseline />
        <Grid
          item
          className="start-section"
          justifyContent="end"
          md={5}
          lg={3.5}
        >
          {isDisplayNone
            ? null
            : <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" height="170px" gap="15px">
              <Avatar
                sx={{
                  width: '150px',
                  height: '150px',
                  border: '2px solid white'
                }}
              >
                <img width={150} height={'auto'} src={user?.picture} />
              </Avatar>
              <Typography variant="h2">
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
            <Wrapper sx={{ p: 0 }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  backgroundColor: theme === 'light' ? '#808080' : '#171717',
                  px: 3,
                  py: 1.3,
                  borderRadius: '2rem 2rem 0rem 0rem'
                }}
              >
                User Description
              </Typography>
              <Box p={2}>
                <Typography mb={2}>Add Description</Typography>
                <Divider />
                <FormHelperText>Joined In {date.toDateString()}</FormHelperText>
              </Box>
            </Wrapper>
          </Box>}
        </Grid>
        <Grid item xs={12} md={7} lg={5.5} px={2} className="main-section">
          <PostsList isHome={false} token={token} userId={userId} />
        </Grid>
        <Grid item className="end-section" lg={3} md={0}>
          {isDisplayNone
            ? null
            : <Suspense
            fallback={<LoaderRing position="relative" top="10%" left="30%" />}
          >
            <AddUser isProfile={true} id={userId}/>
          </Suspense>}
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
