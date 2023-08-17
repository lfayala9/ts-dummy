import { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useAppSelector } from '../hooks/selector'
import type { PostType } from '../types'
import { io } from 'socket.io-client'
const API: string = import.meta.env.VITE_API
const socket = io(API)
const PostsList = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth)
  const config = {
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
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

  socket.on('deleted-post', (id: string) => {
    const handleDeletedPost = (id: string): void => {
      const postToDelete: boolean = postsList.find((post: { _id: string }) => post._id === id)
      if (postToDelete) {
        const newPostsList = postsList.filter((post: { _id: string }) => post._id !== id)
        setPosts(newPostsList)
      }
    }
    handleDeletedPost(id)
  })

  return (
    <div>
      {postsList.map((i: PostType) => (
        <Post post={i} key={i._id}/>
      )).reverse()}
    </div>
  )
}

export default PostsList
