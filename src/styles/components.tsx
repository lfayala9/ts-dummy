import { styled, Box, TextField } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  padding: '0.75rem 1.5rem 0.75rem 1.5rem',
  backgroundColor: theme.palette.background.alt,
  borderRadius: '2rem',
  marginTop: '1.5rem',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 15px;'
}))

export const CustomField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '2rem',
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary,
      borderRadius: '2rem'
    }
  }
}))
