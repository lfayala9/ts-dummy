import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormHelperText,
  Typography
} from '@mui/material'
import { useAppSelector } from '../hooks/selector'

const UserCard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.settings)

  return (
    <>
      <Card sx={{
        width: 345,
        borderRadius: '2rem',
        border: theme === 'light' ? '2px solid #000' : '2px solid #fafafa'
      }}>
        <CardMedia
          component="img"
          alt="user_image"
          height="140"
          image={user?.picture}
        />
        <CardContent sx={{ pt: 1.5 }}>
          <Typography gutterBottom variant="h3" component="div" mb={0}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <FormHelperText>0 friends</FormHelperText>
          <Divider />
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default UserCard
