import { Box, Divider, Typography } from '@mui/material'
import { Wrapper } from '../../styles/components'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState, useEffect, lazy, Suspense } from 'react'
import { getUserList } from '../../utils/hooks/useGetUser'
import './styles.css'
import type { PostInfo, UserInfo } from '../../types'
import LoaderRing from '../Widgets/Loader'
const UserStamp = lazy(async () => await import('../Widgets/UserStamp'))

const AddUser: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.auth)
  const [userList, setUserList] = useState<UserInfo[]>([])

  const getData = async (): Promise<void> => {
    const userListData = await getUserList(token)
    setUserList(userListData)
  }

  useEffect(() => { void getData() }, [token])
  const middleIndex = Math.floor(userList.length / 2)

  return (
    <>
      <Wrapper className='addBox'>
        <Typography variant="h3" my={1}>
          New Users to Add!
        </Typography>
        <Divider />
        <Box>
        <Suspense
            fallback={<LoaderRing position="relative" top="50%" left="50%" />}
          >
          {userList.map((i: UserInfo) => (
            <UserStamp post={i as unknown as PostInfo} isPost={false} key={i._id} userId={i._id} isFriend={i.friends.includes(user?._id as string)}/>
          )).slice(middleIndex - 1, middleIndex + 2)}
          </Suspense>
        </Box>
      </Wrapper>
    </>
  )
}

export default AddUser
