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
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SettingsButton } from './UserStampModal'
import AddFriendButton from './AddFriendButton'

const UserStamp = ({
  isPost,
  post,
  userId,
  isProfile,
  isFriend
}: {
  isPost: boolean
  post: PostInfo
  userId: string
  isProfile?: boolean
  isFriend?: boolean | null
}): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.settings)
  const date = new Date(post.createdAt as string)

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton aria-label='Profile picture button'>
            <Avatar sx={{ width: 50, height: 50 }}>
              <LazyLoadImage
                alt="profile-pic"
                width={'60px'}
                height={'50px'}
                src={isPost ? post?.userPicture : post?.picture}
                effect='blur'
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
              <Typography fontWeight="bold" variant={isPost ? 'h3' : 'h4'} color={isPost ? 'white' : 'inherit'}>
                {post?.firstName} {post?.lastName}{' '}
              </Typography>
            </Link>
            {isPost
              ? (
              <FormHelperText sx={{ color: theme === 'light' ? 'white' : 'grey' }}>
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
          : isProfile === true
            ? null
            : (
          <AddFriendButton isFriend={isFriend as boolean} userId={userId}/>
              )}
      </Box>
    </>
  )
}

export default UserStamp
