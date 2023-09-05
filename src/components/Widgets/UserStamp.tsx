import {
  Box,
  IconButton,
  Avatar,
  Typography,
  FormHelperText,
  Link,
  Tooltip
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupIcon from '@mui/icons-material/Group'
import { useAppSelector } from '../../utils/hooks/selector'
import { type UserInfo, type PostInfo } from '../../types'
import { SettingsButton } from './UserStampModal'
import { useState, useEffect } from 'react'
import { type Id, ToastContainer, toast } from 'react-toastify'
import {
  getUserFriends,
  addDeleteFriends
} from '../../utils/hooks/useGetFriends'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

const UserStamp = ({
  isPost,
  post
}: {
  isPost: boolean
  post: PostInfo
}): JSX.Element => {
  const { user, token } = useAppSelector((state) => state.auth)
  const [friends, setFriends] = useState<UserInfo[]>()
  const [isFriend, setIsFriend] = useState(false)
  const userFriendsData = getUserFriends(token, user?._id)
  const date = new Date(post.createdAt as string)

  // Get the user Data

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setFriends(await userFriendsData)
    }
    void getData()
  }, [])

  // Add/Delete friends Function

  const notify = (): Id => {
    return isFriend
      ? toast.error('Friend deleted!')
      : toast.success('Friend added succesfuly!')
  }
  const handleClick = async (): Promise<void> => {
    isPost
      ? await addDeleteFriends(
        token,
        user?._id != null ? user._id : '',
        post.userId
      )
      : await addDeleteFriends(
        token,
        user?._id != null ? user._id : '',
        post._id
      )
    notify()
  }

  // Check friends
  socket.on('added-friend', (friend) => {
    if (friend._id === post.userId || friend._id === post._id) {
      setIsFriend(true)
    }
  })
  socket.on('deleted-friend', (friend) => {
    if (friend._id === post.userId || friend._id === post._id) {
      setIsFriend(false)
    }
    console.log('deleted')
  })
  const isFriendRefresh = friends?.find((friend) =>
    isPost ? friend._id === post.userId : friend._id === post._id
  )
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton>
            <Avatar
              className="avatar-medium"
              src={isPost ? post?.userPicture : post?.picture}
            />
          </IconButton>
          <Box>
            <Link
              href={`/profile/${
                isPost
                  ? post?.userId != null
                    ? post?.userId
                    : ''
                  : post?._id != null
                  ? post?._id
                  : ''
              }`}
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
        {user?._id === post?.userId || user?._id === post?._id
          ? (
              isPost
                ? (
            <SettingsButton post={post} />
                  )
                : null
            )
          : (
          <Tooltip arrow title={isFriend ? 'Delete Friend' : 'Add Friend'}>
            <IconButton
              size="small"
              onClick={() => {
                void handleClick()
              }}
            >
              <Avatar
                sx={{
                  backgroundColor:
                    isFriend || isFriendRefresh != null ? '#32CD32' : 'grey',
                  '&:hover': {
                    backgroundColor:
                      isFriend || isFriendRefresh != null ? 'red' : '#32CD32'
                  }
                }}
              >
                {isFriend || isFriendRefresh != null
                  ? (
                  <GroupIcon fontSize="small" sx={{ color: 'white' }} />
                    )
                  : (
                  <PersonAddIcon fontSize="small" sx={{ color: 'black' }} />
                    )}
              </Avatar>
            </IconButton>
          </Tooltip>
            )}
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default UserStamp
