import { type Error } from '../types'

export const badSign: Error = {
  err: false,
  message: '',
  success: false
}
const API: string = import.meta.env.VITE_API

export const registerService = async (formData: FormData): Promise<void> => {
  await fetch(`${API}/api/v1/users`, {
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
