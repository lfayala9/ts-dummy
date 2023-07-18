import { setUser, setToken, setIsLoading, type Credential } from '../app-state/index'
import type { Thunk } from '../main'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from './axios'

export const loginService = (data: Credential): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
  dispatch(setIsLoading(true))
  try {
    const response: AxiosResponse = await axios.post('/login', data)
    dispatch(setToken(response.data.token))
    dispatch(setUser(response.data.user.firstName))
    return response
  } catch (error) {
    console.log('bad')
    return error as AxiosError
  } finally {
    dispatch(setIsLoading(false))
  }
}
