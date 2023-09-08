import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../utils/hooks/selector'
import { useParams } from 'react-router-dom'
import { getUser } from '../utils/hooks/useGetUser'
import { type UserInfo } from '../types'
import { TabTitle } from '../utils/hooks/titles'
import { Box } from '@mui/material'

const Profile: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { userId } = useParams()
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    const userData = getUser(token, userId)
    const getData = async (): Promise<void> => {
      setUser(await userData)
    }
    void getData()
  }, [])

  TabTitle(
    `Profile / ${user != null ? user.firstName : ''} ${
      user != null ? user.lastName : ''
    }`
  )
  return <Box mt={8}>{user?.lastName}</Box>
}

export default Profile
