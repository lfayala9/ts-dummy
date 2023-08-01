import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type InitialState } from '../types'

const initialState: InitialState = {
  user: null,
  token: null,
  isLoading: false,
  picture: null
}

const authConfig = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload
    },
    setPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
      state.picture = null
    }
  }
})

export const { setUser, setToken, setPicture, setIsLoading, setLogout } = authConfig.actions
export default authConfig.reducer
