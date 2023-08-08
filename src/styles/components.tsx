import {
  Badge,
  styled,
  Box,
  TextField
} from '@mui/material'

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

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
