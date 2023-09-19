import { Button } from '@mui/material'
import { loginService } from '../../services/login'
import { useAppDispatch } from '../../utils/hooks/selector'

const ExampleLog: React.FC = () => {
  const dispatch = useAppDispatch()
  const email = 'example@npc.com'
  const password = 'dummy123'
  const handleLogin = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    void dispatch(
      loginService({
        email,
        password
      })
    )
  }
  return (
    <Button
      aria-label="Log as an example user"
      color="success"
      variant="contained"
      fullWidth
      sx={{ borderRadius: '10rem', px: 10, mb: 3 }}
      onClick={handleLogin}
    >
      Log as Example User
    </Button>
  )
}

export default ExampleLog
