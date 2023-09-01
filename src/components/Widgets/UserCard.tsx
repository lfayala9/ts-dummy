import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormHelperText,
  Typography
} from '@mui/material'
import { getUserFriends } from '../../utils/hooks/useGetFriends'
import { useAppSelector } from '../../utils/hooks/selector'
import { useEffect, useState } from 'react'
import { type UserInfo } from '../../types'

const UserCard: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth)
  const [friends, setFriends] = useState<UserInfo[]>()
  const userFriendsData = getUserFriends(token, user?._id)
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setFriends(await userFriendsData)
    }
    void getData()
  }, [])
  return (
    <>
      <Card className="user-cardCont" sx={{ borderRadius: '2rem' }}>
        <CardMedia
          component="img"
          alt="user_image"
          height="140"
          image={user?.picture}
          sx={{
            borderRadius: '1.5rem 1.5rem 0.5rem 0.5rem'
          }}
        />
        <CardContent sx={{ pt: 1.5 }}>
          <Typography variant="h3" component="div" mb={0}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <FormHelperText>
            {friends?.length === 1
              ? '1 Friend'
              : `${friends?.length != null ? friends.length : ''} Friends`}
          </FormHelperText>
          <Divider />
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default UserCard
