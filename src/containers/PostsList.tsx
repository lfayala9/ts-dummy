import { useEffect } from 'react'
import useGetPosts from '../hooks/useGet'
import Post, { type PostType } from '../components/Post'
import { useAppSelector } from '../hooks/selector'

const PostsList = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth)
  const posts = useGetPosts(token)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    posts
  })
  return (
    <div>
      {posts.map((i: PostType) => (
        <Post post={i} key={i._id}/>
      )).reverse()}
    </div>
  )
}

export default PostsList
