import { useEffect, useState } from 'react'
import Post, { type PostType } from '../components/Post'
import { useAppSelector } from '../hooks/selector'
import { io } from 'socket.io-client'
const API: string = import.meta.env.VITE_API
const socket = io(API)
const PostsList = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth)
  const config = {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { Authorization: `Bearer ${token}` }
  }
  const [postsList, setPosts] = useState<any>([])

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      await fetch(`${API}/api/v1/posts`, config)
        .then(async (res) => await res.json())
        .then((response) => { setPosts(response) })
    }
    void getPosts()
  }, [])

  socket.on('new-post', (post) => {
    const newPostsList = [...postsList, post]
    setPosts(newPostsList)
  })
  console.log(postsList)
  return (
    <div>
      {postsList.map((i: PostType) => (
        <Post post={i} key={i._id}/>
      )).reverse()}
    </div>
  )
}

export default PostsList
