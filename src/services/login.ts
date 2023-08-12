import { setUser, setToken, setIsLoading } from '../app-state/index'
import type { Thunk } from '../main'
import type { Credential, Error } from '../types'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from './axios'

// Interfaces & Types

export const badLog: Error = {
  err: false,
  message: '',
  success: false
}

export const uName = {
  res: ''
}
// Service
export const loginService = (data: Credential): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
  dispatch(setIsLoading(true))
  try {
    const response: AxiosResponse = await axios.post('/login', data)
    dispatch(setToken(response.data.token))
    dispatch(setUser(response.data.user))
    window.location.href = '/home'
    return response
  } catch (error: any) {
    badLog.err = true
    badLog.message = error.response.data.message
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}
