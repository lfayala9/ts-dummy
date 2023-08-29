import { useEffect, useState } from 'react'
import Post from './Post'
import { useAppSelector } from '../../utils/hooks/selector'
import type { PostInfo, PostType } from '../../types'
import { io } from 'socket.io-client'
import { getPosts } from '../../utils/hooks/useGetPosts'
const API: string = import.meta.env.VITE_API
const socket = io(API)
const PostsList = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.auth)

  const [postsList, setPosts] = useState<PostType[]>([])
  const postListData = getPosts(token)
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setPosts(await postListData)
    }
    void getData()
  }, [])
  socket.on('new-post', (post) => {
    const newPostsList = [...postsList, post]
    setPosts(newPostsList)
  })

  socket.on('deleted-post', (id: string) => {
    const handleDeletedPost = (id: string): void => {
      const postToDelete = postsList.find((post) => post._id === id)
      if (postToDelete != null) {
        const newPostsList = postsList.filter((post) => post._id !== id)
        setPosts(newPostsList)
      }
    }
    handleDeletedPost(id)
  })

  return (
    <div>
      {postsList.map((i: PostType) => (
        <Post post={i as PostInfo} key={i._id}/>
      )).reverse()}
    </div>
  )
}

export default PostsList
