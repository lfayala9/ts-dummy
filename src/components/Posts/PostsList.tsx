import { useEffect, useState, lazy } from 'react'
import type { PostInfo, PostType } from '../../types'
import { getPosts } from '../../utils/hooks/useGetPosts'
import { io } from 'socket.io-client'
const Post = lazy(async () => await import('./Post'))
const API: string = import.meta.env.VITE_API
const socket = io(API)

const PostsList = ({
  token,
  isHome,
  userId
}: {
  token: string | null
  isHome: boolean
  userId?: string
}): JSX.Element => {
  const [postsList, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    const postListData = getPosts(token, isHome, userId)
    const getData = async (): Promise<void> => {
      setPosts(await postListData)
    }
    void getData()
  }, [token])

  socket.on('new-post', (post) => {
    const newPostsList = [...postsList, post]
    setPosts(newPostsList)
  })

  socket.on('deleted-post', (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
  })

  return (
    <div>
      {postsList
        .map((i: PostType) => <Post post={i as PostInfo} key={i._id} />)
        .reverse()}
    </div>
  )
}

export default PostsList
