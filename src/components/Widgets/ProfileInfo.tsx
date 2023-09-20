import { Box, Avatar, Typography, IconButton, Divider, FormHelperText } from '@mui/material'
import { Wrapper } from '../../styles/components'
import { type UserInfo } from '../../types'
import { useAppSelector } from '../../utils/hooks/selector'
import EditIcon from '@mui/icons-material/Edit'

const ProfileInfo = ({ user }: { user: UserInfo }): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)
  const date = new Date(user?.createdAt)

  return (
    <>
      <Box display="flex" flexDirection="column" position="fixed">
        <Box display="flex" alignItems="center" height="170px" gap="15px">
          <Avatar
            sx={{
              width: '150px',
              height: '150px',
              border: '2px solid white'
            }}
          >
            <img
              width={190}
              height={'auto'}
              src={user?.picture}
              alt="user-picture"
            />
          </Avatar>
          <Typography variant="h2">
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
        <Wrapper sx={{ p: 0 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              backgroundColor: theme === 'light' ? '#808080' : '#171717',
              px: 3,
              py: 1.3,
              borderRadius: '2rem 2rem 0rem 0rem'
            }}
          >
            User Description
          </Typography>
          <Box p={2}>
            <Box
              display="flex"
              justifyContent={'space-between'}
              mb={1}
              alignItems="center"
            >
              <Typography>Add Description</Typography>
              <IconButton aria-label='Edit Button'>
                <EditIcon sx={{ width: '15px' }} />
              </IconButton>
            </Box>
            <Divider/>
            <FormHelperText sx={{ mt: 1 }}>Joined In {date.toDateString()}</FormHelperText>
          </Box>
        </Wrapper>
      </Box>
    </>
  )
}

export default ProfileInfo
