import { type UserInfo } from '../../types'
const API: string = import.meta.env.VITE_API
export const getUser = async (token: string | null, userId: string | undefined): Promise<UserInfo> => {
  const config = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/users/${(userId as string)}`, config)
  const data = await response.json()
  return data
}

export const getUserList = async (token: string | null, isProfile: boolean, id?: string | null): Promise<UserInfo[]> => {
  const config = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/users${isProfile ? `/${id != null ? id : ''}/friends` : ''}`, config)
  const data = await response.json()
  return data
}
