import { Box, Typography, IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useAppSelector } from '../../utils/hooks/selector'
import { useState } from 'react'
import { likePost } from '../../utils/hooks/useGetPosts'
import Comments from './Comments'

const PostWidget = ({
  direction,
  fontSize,
  pySize,
  pxSize,
  mbSize,
  likeCount,
  isLiked,
  id,
  openFun
}: {
  direction: 'row' | 'column'
  id: string
  fontSize: string
  pySize: number
  pxSize: number
  mbSize: number
  likeCount: number
  isLiked: boolean
  openFun: any
}): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const { user, token } = useAppSelector((state) => state.auth)
  const [liked, setLiked] = useState(isLiked)
  const [likedCount, setLikeCount] = useState(likeCount)

  const likeDislikePost = async (): Promise<void> => {
    await likePost(token, id, user?._id)
    setLiked(!liked)
    if (liked) {
      setLikeCount(likedCount - 1)
    } else {
      setLikeCount(likedCount + 1)
    }
  }

  return (
    <Box
      py={pySize}
      px={pxSize}
      mb={mbSize}
      display="flex"
      flexDirection={direction}
      justifyContent="space-between"
      sx={{
        backgroundColor: theme === 'light' ? '#bdbdbd' : '#757575',
        borderRadius: '1rem'
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          sx={{ p: 1 }}
          aria-label="Widget Button to like"
          onClick={() => {
            void likeDislikePost()
          }}
        >
          {liked
            ? (
            <FavoriteIcon fontSize="small" color="primary" />
              )
            : (
            <FavoriteBorderOutlinedIcon
              fontSize="small"
              sx={{ color: 'black' }}
            />
              )}
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          {likedCount}{' '}
          <span className="widget-text">
            {likedCount === 1 ? 'Like' : 'Likes'}
          </span>
        </Typography>
      </Box>
      <Comments fontSize={fontSize} openFun={openFun}/>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton sx={{ p: 1 }} aria-label="Widget Button to share">
          <ShareOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          <span className="widget-text">Share</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default PostWidget
