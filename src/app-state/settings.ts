import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Settings {
  theme: string
}

const initialState: Settings = {
  theme: 'light'
}

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
  }
})

export const { setMode } = settingSlice.actions
export default settingSlice.reducer
