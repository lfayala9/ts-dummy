import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('The First Name is required'),
  lastName: yup.string().required('The Last Name is required'),
  email: yup.string().email('Please Enter a valid Email').required('The Email is required'),
  password: yup.string().min(8, 'The password must contain at least 8 characters').required('The password is required'),
  picture: yup.mixed().required('A profile picture is required')
})
