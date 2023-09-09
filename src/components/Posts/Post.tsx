import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import { type PostInfo } from '../../types'
import { lazy, Suspense } from 'react'
import PostWidget from './PostWidget'
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
            <Box display="flex" justifyContent='space-between' gap={3}>
              <Suspense fallback={<PostImage src={'/shrek.webp'} />}>
                <PostImage src={post.picture} />
              </Suspense>
              <PostWidget mbSize={0.7} prSize={3} pbSize={2} direction='column' fontSize='14px'/>
            </Box>
              )
            : (
            <>
              <PostWidget mbSize={0} prSize={2} pbSize={0} direction='row' fontSize='12px'/>
            </>
              )}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
