import { Tooltip, IconButton, Avatar } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupIcon from '@mui/icons-material/Group'
import { useState } from 'react'
import { type Id, toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../../utils/hooks/selector'
import { addDeleteFriends } from '../../utils/hooks/useGetFriends'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)

const AddFriendButton = ({
  isFriend,
  userId
}: {
  isFriend: boolean
  userId: string
}): JSX.Element => {
  const { user, token } = useAppSelector((state) => state.auth)

  const [friend, setFriend] = useState(false)
  const notify = (): Id => {
    return (isFriend && !friend) || (friend && !isFriend)
      ? toast.error('Friend deleted!')
      : toast.success('Friend added succesfuly!')
  }
  const handleClick = async (): Promise<void> => {
    await addDeleteFriends(token, user?._id != null ? user._id : '', userId)
    setFriend(!friend)
    notify()
  }

  // Check friends
  socket.on('added-friend', (friend) => {
    if (friend._id === userId) {
      setFriend(true)
    }
  })
  socket.on('deleted-friend', (friend) => {
    if (friend._id === userId) {
      setFriend(false)
    }
  })
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Tooltip
        arrow
        title={
          (isFriend && !friend) || (friend && !isFriend)
            ? 'Delete Friend'
            : 'Add Friend'
        }
      >
        <IconButton
          size="small"
          aria-label="Add or Delete Friends"
          onClick={() => {
            void handleClick()
          }}
        >
          <Avatar
            sx={{
              backgroundColor:
                (isFriend && !friend) || (friend && !isFriend)
                  ? '#32CD32'
                  : 'grey',
              '&:hover': {
                backgroundColor:
                  (isFriend && !friend) || (friend && !isFriend)
                    ? 'red'
                    : '#32CD32'
              }
            }}
          >
            {(isFriend && !friend) || (friend && !isFriend)
              ? (
              <GroupIcon fontSize="small" sx={{ color: 'white' }} />
                )
              : (
              <PersonAddIcon fontSize="small" sx={{ color: 'black' }} />
                )}
          </Avatar>
        </IconButton>
      </Tooltip>
    </>
  )
}

export default AddFriendButton
