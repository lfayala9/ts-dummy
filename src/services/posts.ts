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
      headers: { Authorization: `Bearer ${token != null ? token : ''}` }
    }
    const response: AxiosResponse = await axios.post('api/v1/posts', data, config)
    return response.data
  } catch (error: any) {
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const commentService = (postId: string | null, data: FormData, token: string | null): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
  dispatch(setIsLoading(false))
  try {
    const config = {
      headers: { Authorization: `Bearer ${token != null ? token : ''}` }
    }
    const response: AxiosResponse = await axios.post(`api/v1/comments/${postId as string}/comment`, data, config)
    return response
  } catch (error: any) {
    console.log(error)
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}
