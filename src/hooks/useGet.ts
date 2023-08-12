/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'
const API: string = import.meta.env.VITE_API

const useGetPosts = (token: string | null) => {
  const config = {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { Authorization: `Bearer ${token}` }
  }
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      await fetch(`${API}/posts`, config)
        .then(async (res) => await res.json())
        .then((response) => { setPosts(response) })
    }
    void getPosts()
  }, [])

  return posts
}

export default useGetPosts
