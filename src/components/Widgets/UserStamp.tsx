import {
  Box,
  IconButton,
  Avatar,
  Typography,
  FormHelperText,
  Link
} from '@mui/material'
import '../../styles/globals.css'
import { useAppSelector } from '../../utils/hooks/selector'
import { type PostInfo } from '../../types'
import { SettingsButton } from './UserStampModal'
import AddFriendButton from './AddFriendButton'

const UserStamp = ({
  isPost,
  post,
  userId,
  isFriend
}: {
  isPost: boolean
  post: PostInfo
  userId: string
  isFriend?: boolean
}): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)
  const date = new Date(post.createdAt as string)

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton>
            <Avatar sx={{ width: 50, height: 50 }}>
              <img
                alt="profile-pic"
                width={'60px'}
                height={'auto'}
                src={isPost ? post?.userPicture : post?.picture}
              />
            </Avatar>
          </IconButton>
          <Box>
            <Link
              href={`/profile/${userId}`}
              underline="none"
              color="inherit"
              fontWeight="light"
            >
              <Typography fontWeight="bold" variant={isPost ? 'h3' : 'h4'}>
                {post?.firstName} {post?.lastName}{' '}
              </Typography>
            </Link>
            {isPost
              ? (
              <FormHelperText>
                Posted on {date.toLocaleDateString()}
              </FormHelperText>
                )
              : null}
          </Box>
        </Box>
        {user?._id === userId
          ? (
              isPost
                ? (
            <SettingsButton post={post} />
                  )
                : null
            )
          : (
          <AddFriendButton isFriend={isFriend as boolean} userId={userId}/>
            )}
      </Box>
    </>
  )
}

export default UserStamp
