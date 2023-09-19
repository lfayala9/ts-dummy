import { IconButton, Avatar, Box, Button, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { PostMenu } from '../Posts/MenuPosts'
import Modals from '../../containers/Modals'
import { deleteService } from '../../services/delete'
import useModal from '../../utils/hooks/useModal'
import useMenu from '../../utils/hooks/useMenu'
import { type PostInfo } from '../../types'

export const SettingsButton = ({ post }: { post: PostInfo }): JSX.Element => {
  // Menu Settings
  const { open, handleOpen, handleClose } = useModal()
  const { anchorEl, openMenu, handleClickMenu, handleCloseMenu } = useMenu()

  return (
    <>
      <IconButton
        onClick={handleClickMenu}
        aria-controls={openMenu ? 'post-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        aria-label="Settings Button"
        size="small"
        sx={{ justifySelf: 'end' }}
      >
        <Avatar>
          <SettingsIcon sx={{ color: 'black' }} />
        </Avatar>
      </IconButton>
      <PostMenu
        id="post-menu"
        handleModal={handleOpen}
        anchorElFun={anchorEl}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
      <Modals openFun={open} handleClose={handleClose} size={300} pySize={4} pxSize={1}>
        <Typography
          sx={{ px: 3 }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          You want to delete this post?
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button
            onClick={() => {
              void deleteService(post?._id != null ? post?._id : '')
              void handleClose
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </Box>
      </Modals>
    </>
  )
}
