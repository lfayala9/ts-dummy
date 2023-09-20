import { Box, Typography } from '@mui/material'
import { Wrapper } from '../../styles/components'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState, useEffect, lazy, Suspense } from 'react'
import { getUserList } from '../../utils/hooks/useGetUser'
import './styles.css'
import type { PostInfo, UserInfo } from '../../types'
import LoaderRing from '../Widgets/Loader'
const UserStamp = lazy(async () => await import('../Widgets/UserStamp'))

const AddUser = ({ isProfile, id }: { isProfile: boolean, id?: string }): JSX.Element => {
  const { token, user } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.settings)
  const [userList, setUserList] = useState<UserInfo[]>([])

  const getData = async (): Promise<void> => {
    const userListData = await getUserList(token, isProfile, id)
    setUserList(userListData)
  }

  useEffect(() => {
    void getData()
  }, [token])
  const middleIndex = Math.floor(userList.length / 2)
  return (
    <>
      <Wrapper className="addBox" sx={{ p: 0 }}>
        <Typography
          variant="h3"
          sx={{
            backgroundColor: theme === 'light' ? '#808080' : '#171717',
            px: 3,
            py: 2,
            borderRadius: '2rem 2rem 0rem 0rem'
          }}
        >
          {isProfile ? 'Friends' : 'New Users to Add!'}
        </Typography>
        <Box p={2}>
          <Suspense
            fallback={<LoaderRing position="relative" top="50%" left="50%" />}
          >
            {userList.length === 0
              ? <Typography variant='h4'>You got no friends... Yet</Typography>
              : userList
                .map((i: UserInfo) => (
                <UserStamp
                  post={i as unknown as PostInfo}
                  isPost={false}
                  key={i._id}
                  userId={i._id}
                  isFriend={isProfile ? null : i.friends.includes(user?._id as string)}
                  isProfile={isProfile}
                />
                ))
                .slice(middleIndex - 1, middleIndex + 2)}
          </Suspense>
        </Box>
      </Wrapper>
    </>
  )
}

export default AddUser
