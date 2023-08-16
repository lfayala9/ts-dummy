import { type AxiosError, type AxiosResponse } from 'axios'
import axios from './axios'

export const deleteService = async (id: string): Promise<AxiosResponse | AxiosError> => {
  try {
    const response: AxiosResponse = await axios.delete(`api/v1/posts/${id}`)
    console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
    console.log(error)
    return error as AxiosError
  }
}
