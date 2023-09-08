import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import UserStamp from '../Widgets/UserStamp'
import { type PostInfo } from '../../types'
// import { Image } from 'mui-image'
// import LoaderRing from '../Widgets/Loader'

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
              alt='post_image'
              src={post.picture}
              className='post-image'
              loading='lazy'
              // showLoading={<LoaderRing position="relative" top="50%" left="0%" />}
            />
              )
            : null}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
