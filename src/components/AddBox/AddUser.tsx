import { Box, Divider, Typography } from '@mui/material'
import { Wrapper } from '../../styles/components'
import UserStamp from '../Widgets/UserStamp'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState, useEffect } from 'react'
import { getUserList } from '../../utils/hooks/useGetUser'
import './styles.css'
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
  const middleIndex = Math.floor(userList.length / 2)
  return (
    <>
      <Wrapper className='addBox'>
        <Typography variant="h3" my={1}>
          New Users to Add!
        </Typography>
        <Divider />
        <Box>
          {userList.map((i: UserInfo) => (
            <UserStamp post={i as PostInfo} isPost={false} key={i._id}/>
          )).slice(middleIndex - 1, middleIndex + 2)}
        </Box>
      </Wrapper>
    </>
  )
}

export default AddUser
