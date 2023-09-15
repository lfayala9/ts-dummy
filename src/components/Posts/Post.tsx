import { Wrapper } from '../../styles/components'
import { Box, Typography, Divider } from '@mui/material'
import './styles.css'
import type { PostInfo, UserInfo } from '../../types'
import { type ChangeEvent, lazy, Suspense, useEffect, useState } from 'react'
import PostWidget from './PostWidget'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/selector'
import { getUser } from '../../utils/hooks/useGetUser'
import CreatePost from './CreatePost'
import { commentService } from '../../services/posts'
import LoaderRing from '../Widgets/Loader'

const CommentList = lazy(async () => await import('../Comments/CommentList'))
const PostImage = lazy(async () => await import('./PostImage'))
const UserStamp = lazy(async () => await import('../Widgets/UserStamp'))

const Post = ({ post }: { post: PostInfo }): JSX.Element => {
  const { token, user } = useAppSelector((state) => state.auth)
  const [userData, setUser] = useState<UserInfo>()
  const [openComment, setOpenComment] = useState(false)
  const isLiked = Boolean(post.likes[user?._id as string])
  const likeCount = Object.keys(post.likes).length
  const isFriend = userData?.friends.includes(user?._id as string)
  // Check friends

  useEffect(() => {
    const getUserData = getUser(token, post.userId)
    const getData = async (): Promise<void> => {
      setUser(await getUserData)
    }
    void getData()
  }, [])
  // Comment Service
  const commentValue = {
    userId: user?._id,
    commentContent: '',
    picture: null as File | null
  }
  const [form, setForm] = useState(commentValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'picture') {
      const file = e.target.files != null ? e.target.files[0] : null
      setForm({ ...form, [e.target.name]: file })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }
  const dispatch = useAppDispatch()
  const handleComment = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    }
    void dispatch(commentService(post?._id, formData, token))
  }
  return (
    <>
      <Wrapper className="mainPostBox">
        <Box>
          <UserStamp
            post={post}
            isPost={true}
            userId={post.userId}
            isFriend={isFriend}
          />
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {post?.picture != null
            ? (
            <Box display="flex" justifyContent="space-between" className='post-box'>
              <Suspense fallback={<PostImage src={'/shrek.webp'} />}>
                <PostImage src={post.picture} />
              </Suspense>
              <PostWidget
                openFun={() => {
                  setOpenComment(!openComment)
                }}
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
                openFun={() => {
                  setOpenComment(!openComment)
                }}
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
        {openComment && (
          <>
            <Divider sx={{ mt: '10px' }} />
            <Suspense fallback={<LoaderRing position="relative" top="50%" left="50%" />}>
              <CommentList postId={post._id} />
            </Suspense>
            <CreatePost
              isComment={true}
              fieldClass="commentInput"
              createBox="commentBox"
              classBox="createComment"
              onSubmit={handleComment}
              onChange={handleChange}
            />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default Post
