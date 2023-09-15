import { Box, IconButton, Typography } from '@mui/material'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import './styles.css'

const CommentButton = ({
  fontSize,
  openFun
}: {
  fontSize: string
  openFun: () => React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={openFun}
          sx={{ p: 0, ml: 1 }}
          aria-label="Widget Button to comment"
        >
          <MessageOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          <span className="widget-text">Comment</span>
        </Typography>
      </Box>
    </>
  )
}

export default CommentButton
