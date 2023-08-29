/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Wrapper } from '../../styles/components'
import {
  Box,
  Typography,
  Divider
} from '@mui/material'
import './styles.css'
import FollowUser from '../Widgets/FollowUser'
import { type PostInfo } from '../../types'

const Post = ({ post }: { post: PostInfo }): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Box>
          <FollowUser post={post} isPost={true}/>
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {post?.picture != null
            ? (
            <img
              width="100%"
              style={{ borderRadius: '1rem' }}
              src={post?.picture}
            />
              )
            : null}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
