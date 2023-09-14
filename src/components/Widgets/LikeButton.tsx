import { Box, IconButton, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({
  likeDislikeFun,
  liked,
  fontSize,
  likedCount,
  isComment
}: {
  likeDislikeFun: () => Promise<void>
  liked: boolean
  isComment: boolean
  fontSize: string
  likedCount: number
}): JSX.Element => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        {isComment ? <Typography fontSize='15px' color='black'>{likedCount}</Typography> : null}
        <IconButton
          sx={{ p: 1, pr: 0 }}
          aria-label="Widget Button to like"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={likeDislikeFun}
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
          {isComment
            ? null
            : (
            <>
              {likedCount}{' '}
              <span className="widget-text">
                {likedCount === 1 ? 'Like' : 'Likes'}
              </span>
            </>
              )}
        </Typography>
      </Box>
    </>
  )
}

export default LikeButton
