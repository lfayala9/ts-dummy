import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome.tsx'
import Home from './pages/Home.tsx'
import { useAppSelector } from './hooks/selector.ts'

const App = (): JSX.Element => {
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
