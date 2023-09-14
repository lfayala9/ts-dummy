import { Box, IconButton, Typography } from '@mui/material'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import './styles.css'

const CommentButton = ({
  fontSize,
  openFun,
  commentCount
}: {
  fontSize: string
  commentCount: number | undefined
  openFun: () => React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={openFun}
          sx={{ p: 1 }}
          aria-label="Widget Button to comment"
        >
          <MessageOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          {commentCount} <span className="widget-text">Comments</span>
        </Typography>
      </Box>
    </>
  )
}

export default CommentButton
