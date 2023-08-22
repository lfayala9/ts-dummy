import { type PostType } from '../../types'

const API: string = import.meta.env.VITE_API

export const getPosts = async (token: string | null): Promise<PostType[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/posts`, config)
  const data = await response.json()
  return data
}
