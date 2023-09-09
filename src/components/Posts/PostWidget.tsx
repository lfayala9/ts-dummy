import { Box, Typography, IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useAppSelector } from '../../utils/hooks/selector'

const PostWidget = ({
  direction,
  fontSize,
  pbSize,
  prSize,
  mbSize
}: {
  direction: 'row' | 'column'
  fontSize: string
  pbSize: number
  prSize: number
  mbSize: number
}): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  return (
    <Box
      py={pbSize}
      px={prSize}
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
        <IconButton sx={{ p: 1 }}>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            sx={{ color: 'black' }}
          />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          0 <span className="widget-text">Likes</span>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton sx={{ p: 1 }}>
          <MessageOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
        </IconButton>
        <Typography fontSize={fontSize} color="black">
          0 <span className="widget-text">Comments</span>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton sx={{ p: 1 }}>
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
