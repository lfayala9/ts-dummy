import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome.tsx'
import Home from './pages/Home.tsx'
import { useAppSelector } from './hooks/selector.ts'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3002')

const App = (): JSX.Element => {
  useEffect(() => {
    socket.on('connect', () => { console.log('connected') })
  })
  const isAuth = Boolean(useAppSelector((state) => state.auth.token))
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <Welcome />}
          />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
