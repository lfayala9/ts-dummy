import NavBar from '../components/NavBar'
import { TabTitle } from '../hooks/titles'

const Home: React.FC = () => {
  TabTitle('Fake Social / Home')
  return (
    <>
    <NavBar/>
    <h1 style={{ height: '1000px' }}>home</h1>
    </>
  )
}

export default Home
