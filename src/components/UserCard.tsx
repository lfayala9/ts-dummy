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
import { useAppSelector } from '../utils/hooks/selector'

const UserCard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <>
      <Card sx={{
        width: 345,
        margin: 'auto',
        padding: '6px',
        borderRadius: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 15px;'
      }}>
        <CardMedia
          component="img"
          alt="user_image"
          height="140"
          image={user?.picture}
          sx={{
            borderRadius: '1.5rem 1.5rem 0.5rem 0.5rem'
          }}
        />
        <CardContent sx={{ pt: 1.5 }}>
          <Typography variant="h3" component="div" mb={0}>
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
