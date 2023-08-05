import { type Error } from '../types'

export const badSign: Error = {
  err: false,
  message: '',
  success: false
}
const API: string = import.meta.env.VITE_API

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerService = async (formData: FormData) => {
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
