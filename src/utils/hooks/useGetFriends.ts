import { type UserInfo } from '../../types'

const API: string = import.meta.env.VITE_API
export const getUserFriends = async (token: string | null, userId: string | undefined): Promise<UserInfo[]> => {
  const config = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/users/${(userId as string)}/friends`, config)
  const data = await response.json()
  return data
}
