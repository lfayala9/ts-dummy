import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Grid, CssBaseline } from '@mui/material'
import { useAppSelector } from '../utils/hooks/selector'
import { useParams } from 'react-router-dom'
import { getUser } from '../utils/hooks/useGetUser'
import { type UserInfo } from '../types'
import { Helmet } from 'react-helmet-async'
import { TabTitle } from '../utils/hooks/titles'
import PostsList from '../components/Posts/PostsList'
import LoaderRing from '../components/Widgets/Loader'
import { useDisplay } from '../utils/hooks/display'
import ProfileInfo from '../components/Widgets/ProfileInfo'
const AddUser = lazy(async () => await import('../components/AddBox/AddUser'))

const Profile: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
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
          md={6}
          lg={3.5}
        >
          {isDisplayNone
            ? null
            : (
              <ProfileInfo user={user as UserInfo}/>
              )}
        </Grid>
        <Grid item xs={12} md={6} lg={5.5} px={2} className="main-section">
          <PostsList isHome={false} token={token} userId={userId} />
        </Grid>
        <Grid item className="end-section" lg={3} md={0}>
          {isDisplayNone
            ? null
            : (
            <Suspense
              fallback={<LoaderRing position="relative" top="10%" left="30%" />}
            >
              <AddUser isProfile={true} id={userId} />
            </Suspense>
              )}
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
