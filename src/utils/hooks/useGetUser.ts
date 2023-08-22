import { type UserInfo } from '../../types'
const API: string = import.meta.env.VITE_API
const getUser = async (token: string | null, userId: string | undefined): Promise<UserInfo> => {
  const config = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token != null ? token : ''}` }
  }
  const response = await fetch(`${API}/api/v1/users/${(userId as string)}`, config)
  const data = await response.json()
  return data
}

export default getUser
