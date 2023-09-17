import { type PostType } from '../../types'

const API: string = import.meta.env.VITE_API

export const getPosts = async (token: string | null, isHome: boolean, userId?: string): Promise<PostType[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }

  const response = await fetch(`${API}/api/v1/posts${isHome ? '' : `/by/${userId != null ? userId : ''}`}`, config)
  const data = await response.json()
  return data
}

export const getSinglePost = async (token: string | null, postId: string | null): Promise<PostType> => {
  const config = {
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/posts/${postId != null ? postId : ''}`, config)
  const data = await response.json()
  return data
}

export const likePost = async (token: string | null, postId: string | null, userId: string | undefined): Promise<void> => {
  const config = {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/posts/${(postId as string)}/like/${userId as string}`, config)
  const data = await response.json()
  void data
}
