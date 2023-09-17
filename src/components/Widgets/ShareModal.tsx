import { Button, Box, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkIcon from '@mui/icons-material/Link'
import Modals from '../../containers/Modals'

const ShareModal = ({
  open,
  handleClose
}: {
  open: boolean
  handleClose: () => void
}): JSX.Element => {
  return (
    <Modals
      openFun={open}
      handleClose={handleClose}
      size={300}
      pySize={4}
      pxSize={1}
    >
      <Box className="share-modal">
        <Typography variant='h3'>Share it with your friends!</Typography>
        <Button
          endIcon={<TwitterIcon />}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#00acee' }}
        >
          Share via Twitter
        </Button>
        <Button endIcon={<FacebookIcon />} variant="contained" fullWidth>
          Share via Facebook
        </Button>
        <Button
          endIcon={<InstagramIcon />}
          variant="contained"
          fullWidth
          sx={{
            background:
              'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
          }}
        >
          Share via Instagram
        </Button>
        <Button
          endIcon={<LinkIcon />}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'black'
          }}
        >
          Copy Link
        </Button>
      </Box>
    </Modals>
  )
}

export default ShareModal
