import { type Error } from '../types'

export const badSign: Error = {
  err: false,
  message: '',
  success: false
}

const API = process.env.REACT_APP_API

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerService = async (formData: any) => {
  await fetch(`${API}/users`, {
    method: 'POST',
    body: formData
  })
    .then((data) => {
      if (data.status === 400) {
        badSign.success = false
        badSign.err = true
        badSign.message = 'Invalid E-mail'
      } else if (data.status === 200) {
        badSign.success = true
        badSign.err = false
        badSign.message = 'Account created successfully'
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

// import axios from './axios'
// import type { AxiosResponse, AxiosError } from 'axios'
// import { type Error } from './login'
// import { type Thunk } from '../main'

// // Interfaces & Types

// export interface User {
//   email: string
//   password: string
//   firstName: string
//   lastName: string
//   picture: string
// }

// export const badSign: Error = {
//   err: false,
//   message: '',
//   success: false
// }
// // Service

// export const registerService = (data: User): Thunk => async (dispatch): Promise<AxiosError | AxiosResponse> => {
//   dispatch(setIsLoading(true))
//   try {
//     const response: AxiosResponse = await axios.post('/users', data)
//     badSign.success = true
//     console.log('good login')
//     return response
//   } catch (error: any) {
//     badSign.success = false
//     badSign.err = true
//     badSign.message = error.response.data.message
//     return error as AxiosError
//   } finally {
//     dispatch(setIsLoading(false))
//   }
// }
