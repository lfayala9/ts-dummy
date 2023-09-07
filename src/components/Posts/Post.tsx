import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import UserStamp from '../Widgets/UserStamp'
import { type PostInfo } from '../../types'
// import { Image } from 'mui-image'

const Post = ({ post }: { post: PostInfo }): JSX.Element => {
  return (
    <>
      <Wrapper className="mainPostBox">
        <Box>
          <UserStamp post={post} isPost={true} />
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {post?.picture != null
            ? (
            <img
              loading="lazy"
              width="506px"
              src={post.picture}
              style={{
                borderRadius: '1rem',
                maxWidth: '100%',
                maxHeight: 'auto'
              }}
            />
              )
            : null}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
