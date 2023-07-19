import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { useAppSelector } from '../hooks/selector'
import { createBreakpoints } from '@mui/system'

const breakpoints = createBreakpoints({})
interface Props {
  children: React.ReactNode
}

const MuiTheme: React.FC<Props> = ({ children }) => {
  const { theme } = useAppSelector((state) => state.settings)
  const isLight = theme === 'light'

  const themeMode = createTheme({
    typography: {
      fontFamily: [
        'Roboto',
        'sans-serif'
      ].join(','),
      h1: {
        fontFamily: [
          'Roboto',
          'sans-serif'
        ].join(','),
        fontSize: 45,
        [breakpoints.up('xl')]: {
          fontSize: 60
        }
      },
      h2: {
        fontFamily: [
          'Roboto',
          'sans-serif'
        ].join(','),
        fontSize: 35,
        [breakpoints.up('xl')]: {
          fontSize: 45
        }
      },
      h3: {
        fontFamily: [
          'Roboto',
          'sans-serif'
        ].join(','),
        fontSize: 30,
        [breakpoints.up('xl')]: {
          fontSize: 40
        }
      },
      h4: {
        fontFamily: [
          'Roboto',
          'sans-serif'
        ].join(','),
        fontSize: 20,
        [breakpoints.up('xl')]: {
          fontSize: 35
        }
      },
      h5: {
        fontFamily: [
          'Roboto',
          'sans-serif'
        ].join(','),
        fontSize: 15,
        [breakpoints.up('xl')]: {
          fontSize: 20
        }
      }
    },
    palette: {
      primary: {
        main: '#284195'
      },
      secondary: {
        main: isLight ? '#dfd7f4' : '#130b28'
      },
      info: {
        main: isLight ? '#9a36d9' : '#d5a03f'
      },
      mode: isLight ? 'light' : 'dark',
      background: {
        default: isLight ? '#fafafa' : '#050505'
      }
    }
  })
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={themeMode}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiTheme
