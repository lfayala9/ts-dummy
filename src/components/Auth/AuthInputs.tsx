import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField
} from '@mui/material'
import { type ChangeEvent, useState } from 'react'

export const PassWordInput = ({
  changeFun,
  value
}: {
  changeFun: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
}): JSX.Element => {
  // Hide/Show Password
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show)
  }
  return (
    <>
      <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
      <OutlinedInput
        name="password"
        onChange={changeFun}
        value={value}
        fullWidth
        required
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </>
  )
}

export const TextInput = ({
  changeFun,
  value,
  name,
  autoComplete,
  label,
  id
}: {
  changeFun: any
  value?: string
  name?: string
  autoComplete?: string
  label?: string
  id?: string
}): JSX.Element => {
  return (
    <TextField
      name={name}
      autoComplete={autoComplete}
      label={label}
      id={id}
      autoFocus
      required
      fullWidth
      onChange={changeFun}
      value={value}
    />
  )
}
