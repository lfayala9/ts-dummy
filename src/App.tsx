import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './utils/hooks/selector.ts'
import { lazy, Suspense } from 'react'
import LoaderRing from './components/Widgets/Loader.tsx'
import NavBar from './components/Widgets/NavBar.tsx'
import 'react-toastify/dist/ReactToastify.css'
const Profile = lazy(async () => await import('./pages/Profile.tsx'))
const Welcome = lazy(async () => await import('./pages/Welcome.tsx'))
const Home = lazy(async () => await import('./pages/Home.tsx'))

const App = (): JSX.Element => {
  const isAuth = Boolean(useAppSelector((state) => state.auth.token))
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoaderRing position='absolute' top='50%' left='50%'/>}>
      {isAuth ? <NavBar/> : null}
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/home" /> : <Welcome />}
            />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path='/profile/:userId'
              element={isAuth ? <Profile/> : <Navigate to="/" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
