import { Wrapper } from '../styles/components'
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  FormHelperText,
  Tooltip,
  Divider,
  Button
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { PostMenu } from '../containers/MenuPosts'
import { useAppSelector } from '../hooks/selector'
import { useState, type MouseEvent } from 'react'
import { deleteService } from '../services/delete'
import Modals from '../containers/Modals'

const Post = ({ post }: any): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)

  // Menu settings

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
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton>
              <Avatar sx={{ width: 56, height: 56 }} src={post?.userPicture} />
            </IconButton>
            <Box>
              <Typography fontWeight="bold" variant="h3">
                {post?.firstName} {post?.lastName}
              </Typography>
              <FormHelperText sx={{ my: 0 }}>
                Posted 0 minutes ago
              </FormHelperText>
            </Box>
          </Box>
          {post?.userId === user?._id
            ? (
            <IconButton
              onClick={handleClickMenu}
              aria-controls={openMenu ? 'post-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              size="small"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <SettingsIcon sx={{ color: 'black' }} />
              </Avatar>
            </IconButton>
              )
            : (
            <Tooltip arrow title="Add/Delete Friend">
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonAddIcon fontSize="small" sx={{ color: 'black' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
              )}
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {post?.picture != null
            ? (
            <img
              width="100%"
              style={{ borderRadius: '1rem' }}
              src={post?.picture}
            />
              )
            : null}
        </Box>
      </Wrapper>
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
              void deleteService(post._id)
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

export default Post
