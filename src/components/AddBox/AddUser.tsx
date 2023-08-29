import { Box, Divider, Typography } from '@mui/material'
import { Wrapper } from '../../styles/components'
import FollowUser from '../Widgets/FollowUser'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState, useEffect } from 'react'
import { getUserList } from '../../utils/hooks/useGetUser'
import type { PostInfo, UserInfo } from '../../types'

const AddUser: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const [userList, setUserList] = useState<UserInfo[]>([])
  const userListData = getUserList(token)
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setUserList(await userListData)
    }
    void getData()
  }, [])

  return (
    <>
      <Wrapper>
        <Typography variant="h3" my={1}>
          New Users to Add!
        </Typography>
        <Divider />
        <Box>
          {userList.map((i: UserInfo) => (
            <FollowUser post={i as PostInfo} isPost={false} key={i._id}/>
          )).splice(1, 4)}
        </Box>
      </Wrapper>
    </>
  )
}

export default AddUser
