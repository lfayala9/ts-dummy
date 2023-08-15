import type { AxiosError, AxiosResponse } from 'axios'
import { setIsLoading } from '../app-state'
import { type Thunk } from '../main'
import { type Error } from '../types'
import axios from './axios'

export const postStatus: Error = {
  err: false,
  message: '',
  success: false
}

export const postService = (data: FormData, token: string | null): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
  dispatch(setIsLoading(true))
  try {
    const config = {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      headers: { Authorization: `Bearer ${token}` }
    }
    const response: AxiosResponse = await axios.post('/posts', data, config)
    return response.data
  } catch (error: any) {
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}
