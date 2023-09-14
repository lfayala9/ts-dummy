import { Avatar, Box, Typography } from '@mui/material'
import LikeButton from '../Widgets/LikeButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppSelector } from '../../utils/hooks/selector'
import { type CommentInfo } from '../../types'

const Comment = ({ comment }: { comment: CommentInfo }): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Box
      className="single-comment"
      sx={{
        backgroundColor: theme === 'light' ? '#bdbdbd' : '#757575'
      }}
    >
      <Box className="comment-info">
        <Avatar sx={{ width: 24, height: 24 }} src={comment.userPicture}/>
        <Typography fontWeight="bolder" fontSize="12px">
          {comment.firstName} {comment.lastName}:{' '}
        </Typography>
        <Typography fontSize="12px">{comment.commentContent}</Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <LikeButton isComment={true} likedCount={0} />
        {comment.userId === user?._id ? <DeleteOutlineIcon sx={{ mr: 1, color: '#F44336' }}/> : null}
      </Box>
    </Box>
  )
}

export default Comment
