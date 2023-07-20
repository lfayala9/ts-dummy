import axios from './axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { type Error } from './login'
import { type Thunk } from '../main'
import { setIsLoading } from '../app-state'

// Interfaces & Types

export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const badSign: Error = {
  err: false,
  message: '',
  success: false
}
// Service

export const registerService = (data: User): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
  dispatch(setIsLoading(true))
  try {
    const response: AxiosResponse = await axios.post('/users', data)
    badSign.success = true
    console.log('good login')
    return response
  } catch (error: any) {
    badSign.success = false
    badSign.err = true
    badSign.message = error.response.data.message
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}
