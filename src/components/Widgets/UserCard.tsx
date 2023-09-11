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
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useAppSelector } from '../../utils/hooks/selector'

const UserCard = ({ userPicture }: { userPicture: string | undefined }): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <>
      <Card className="user-cardCont" sx={{ borderRadius: '2rem' }}>
        <CardMedia
          component="img"
          alt="user_image"
          width='300'
          height="140"
          image={userPicture}
          sx={{
            borderRadius: '1.5rem 1.5rem 0.5rem 0.5rem'
          }}
        />
        <CardContent sx={{ pt: 1.5 }}>
          <Typography variant="h3" component="div" mb={0}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <FormHelperText className='card-text'>
            See Friends
          </FormHelperText>
          <Divider />
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' startIcon={<ShareOutlinedIcon />} sx={{ borderRadius: '2rem' }}>Share Profile</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default UserCard
