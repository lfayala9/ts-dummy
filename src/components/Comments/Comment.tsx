import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import LikeButton from '../Widgets/LikeButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppSelector } from '../../utils/hooks/selector'
import { type CommentInfo } from '../../types'
import { likePostComment } from '../../utils/hooks/userGetComments'
import { useState } from 'react'
import Modals from '../../containers/Modals'
import { deleteCommentService } from '../../services/delete'
import useModal from '../../utils/hooks/useModal'

const Comment = ({ comment }: { comment: CommentInfo }): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const { user, token } = useAppSelector((state) => state.auth)
  const isLiked = Boolean(comment.likes[user?._id as string])
  const [liked, setLiked] = useState(isLiked)
  const likeCount = Object.keys(comment.likes).length
  const [likedCount, setLikeCount] = useState(likeCount)
  const { open, handleOpen, handleClose } = useModal()

  const likeDislikePostComment = async (): Promise<void> => {
    await likePostComment(token, comment._id, user?._id)
    setLiked(!liked)
    setLikeCount(likedCount + (liked ? -1 : 1))
  }

  return (
    <Box
      className="single-comment"
      sx={{
        backgroundColor: theme === 'light' ? '#bdbdbd' : '#757575'
      }}
    >
      <Box className="comment-info">
        <Avatar sx={{ width: 24, height: 24 }} src={comment.userPicture} />
        <Box>
        <Typography fontWeight="bolder" fontSize="12px">
          {comment.firstName} {comment.lastName}:{' '}
        </Typography>
        </Box>
        <Typography fontSize="12px">{comment.postContent}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <LikeButton
          likeDislikeFun={likeDislikePostComment}
          isComment={true}
          likedCount={likedCount}
          liked={liked}
        />
        {comment.userId === user?._id
          ? (
          <IconButton sx={{ p: 0 }} onClick={handleOpen}>
            <DeleteOutlineIcon sx={{ color: '#8b0000' }} />
          </IconButton>
            )
          : null}
      </Box>
      <Modals openFun={open} handleClose={handleClose} size={300} pySize={4} pxSize={1}>
        <Typography
          sx={{ px: 3 }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          You want to delete this comment?
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button
            onClick={() => {
              void deleteCommentService(comment.postId, comment._id, token)
              void handleClose
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </Box>
      </Modals>
    </Box>
  )
}

export default Comment
