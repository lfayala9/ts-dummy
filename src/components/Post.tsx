import { Wrapper } from '../styles/components'
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  FormHelperText,
  Divider
} from '@mui/material'

interface PostInfo {
  _id: string
  firstName: string
  lastName: string
  userPicture: string
  picture: string
  postContent: string
}

export interface PostType {
  _id?: string
  post?: PostInfo
}

const Post = ({ post }: any): JSX.Element => {
  // const { user } = useAppSelector((state) => state.auth)
  return (
    <Wrapper>
      <Box display="flex" alignItems="center">
        <IconButton>
          <Avatar sx={{ width: 56, height: 56 }} src={post?.userPicture}/>
        </IconButton>
        <Box>
          <Typography fontWeight="bold" variant="h3">
            {post?.firstName} {post?.lastName}
          </Typography>
          <FormHelperText sx={{ my: 0 }}>Posted 0 minutes ago</FormHelperText>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
        <img
          width="100%"
          style={{ borderRadius: '1rem' }}
          src={post?.picture}
        />
      </Box>
    </Wrapper>
  )
}

export default Post
