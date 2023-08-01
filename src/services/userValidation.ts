import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email('Please Enter a valid Email').required(),
  password: yup.string().min(8, 'The password must contain at least 8 characters').required(),
  picture: yup.mixed().required('A profile picture is required')
})
