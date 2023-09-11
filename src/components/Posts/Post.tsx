import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import type { PostInfo, UserInfo } from '../../types'
import { lazy, Suspense, useEffect, useState } from 'react'
import PostWidget from './PostWidget'
import { useAppSelector } from '../../utils/hooks/selector'
import { getUser } from '../../utils/hooks/useGetUser'
import { io } from 'socket.io-client'

const API: string = import.meta.env.VITE_API
const socket = io(API)
const PostImage = lazy(async () => await import('./PostImage'))
const UserStamp = lazy(async () => await import('../Widgets/UserStamp'))

const Post = ({ post }: { post: PostInfo }): JSX.Element => {
  const { user, token } = useAppSelector((state) => state.auth)

  // Check friends

  const [userData, setUser] = useState<UserInfo>()
  useEffect(() => {
    const getUserData = getUser(token, post.userId)
    const getData = async (): Promise<void> => {
      setUser(await getUserData)
    }
    void getData()
  }, [])
  const isFriend = userData?.friends.includes(user?._id as string)

  // Update Like count

  const isLiked = Boolean(post.likes[user?._id as string])
  const [likeCount, setLikeCount] = useState(Object.keys(post.likes).length)
  useEffect(() => {
    socket.on('like-post', (likedPost) => {
      if (likedPost === post._id) {
        setLikeCount(likeCount + 1)
      }
    })
    socket.on('unlike-post', (unlikedPost) => {
      console.log('unliked', unlikedPost)
    })
  }, [])

  return (
    <>
      <Wrapper className="mainPostBox">
        <Box>
          <UserStamp post={post} isPost={true} userId={post.userId} isFriend={isFriend}/>
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {post?.picture != null
            ? (
            <Box display="flex" justifyContent="space-between">
              <Suspense fallback={<PostImage src={'/shrek.webp'} />}>
                <PostImage src={post.picture} />
              </Suspense>
              <PostWidget
                id={post._id}
                isLiked={isLiked}
                likeCount={likeCount}
                mbSize={0.7}
                pxSize={3}
                pySize={2}
                direction="column"
                fontSize="14px"
              />
            </Box>
              )
            : (
            <>
              <PostWidget
                id={post._id}
                isLiked={isLiked}
                likeCount={likeCount}
                mbSize={0}
                pxSize={2}
                pySize={0}
                direction="row"
                fontSize="12px"
              />
            </>
              )}
        </Box>
      </Wrapper>
    </>
  )
}

export default Post
