import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import Welcome from './pages/Welcome.tsx'
// import Home from './pages/Home.tsx'
import { useAppSelector } from './hooks/selector.ts'
import { useEffect, lazy, Suspense } from 'react'
import { io } from 'socket.io-client'

const Welcome = lazy(async () => await import('./pages/Welcome.tsx'))
const Home = lazy(async () => await import('./pages/Home.tsx'))
const socket = io('http://localhost:3002')

const App = (): JSX.Element => {
  useEffect(() => {
    socket.on('connect', () => { console.log('connected') })
  })
  const isAuth = Boolean(useAppSelector((state) => state.auth.token))
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<h4>LOADING</h4>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
