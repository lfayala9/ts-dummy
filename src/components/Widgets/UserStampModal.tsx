import { IconButton, Avatar, Box, Button, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState, type MouseEvent } from 'react'
import { PostMenu } from '../../containers/MenuPosts'
import Modals from '../../containers/Modals'
import { deleteService } from '../../services/delete'
import { type PostInfo } from '../../types'

export const SettingsButton = ({ post }: { post: PostInfo }): JSX.Element => {
  // Menu Settings
  const [anchorElMenu, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorElMenu)
  const handleClickMenu = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseMenu = (): void => {
    setAnchorEl(null)
  }
  // Delete Post

  const [open, setOpen] = useState(false)
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  return (
    <>
      <IconButton
        onClick={handleClickMenu}
        aria-controls={openMenu ? 'post-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        aria-label='Settings Button'
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
        anchorElFun={anchorElMenu}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
           <Modals openFun={open} handleClose={handleClose} size={300}>
        <Typography sx={{ px: 3 }} id="modal-modal-title" variant="h6" component="h2">
          You want to delete this post?
        </Typography>
        <Box display="flex" justifyContent='space-around' mt={2}>
          <Button
            onClick={() => {
              void deleteService(((post?._id) != null) ? post?._id : '')
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
