import axios from './axios'
import type { AxiosResponse, AxiosError } from 'axios'
export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
}

const registerService = async (data: User): Promise<AxiosError | AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post('/users', data)
    console.log('good login')
    return response
  } catch (error) {
    return error as AxiosError
  }
}

export default registerService
