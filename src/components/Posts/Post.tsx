import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import { type PostInfo } from '../../types'
import { lazy, Suspense } from 'react'
const PostImage = lazy(async () => await import('./PostImage'))
const UserStamp = lazy(async () => await import('../Widgets/UserStamp'))

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
              <Suspense fallback={<PostImage src={'/shrek.webp'} />}>
                <PostImage src={post.picture} />
              </Suspense>
              )
            : null}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
