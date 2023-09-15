import { type CommentType } from '../../types'

const API: string = import.meta.env.VITE_API

export const getPostComments = async (token: string | null, postId: string | null): Promise<CommentType[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/comments/${postId as string}/comments`, config)
  const data = await response.json()
  return data
}
export const likePostComment = async (token: string | null, id: string | null, userId: string | undefined): Promise<void> => {
  const config = {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/comments/${(id as string)}/like/${userId as string}`, config)
  const data = await response.json()
  void data
}
