import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import authReducer from './app-state/index.ts'
import settingReducer from './app-state/settings.ts'
import MuiTheme from './styles/theme.tsx'
import {
  type Action,
  type ThunkAction,
  configureStore
} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { HelmetProvider } from 'react-helmet-async'
import './styles/main.css'

const persistedConfig = {
  key: 'auth',
  storage,
  version: 1,
  whitelist: ['user', 'token']
}

const persistedSettingsConfig = {
  key: 'settings',
  storage,
  whitelist: ['theme']
}

const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistedConfig,
      authReducer
    ),
    settings: persistReducer<ReturnType<typeof settingReducer>>(
      persistedSettingsConfig,
      settingReducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Thunk = ThunkAction<
Promise<unknown>,
RootState,
unknown,
Action<unknown>
>

export const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiTheme>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MuiTheme>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
