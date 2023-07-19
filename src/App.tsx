import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome.tsx'

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
