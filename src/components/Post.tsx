/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Wrapper } from '../styles/components'
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  FormHelperText,
  Tooltip,
  Divider
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { PostMenu } from './Menus'
import { useAppSelector } from '../hooks/selector'
import { useState, type MouseEvent } from 'react'
import { deleteService } from '../services/delete'

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
                <SettingsIcon sx={{ color: 'black' }}/>
              </Avatar>
            </IconButton>
              )
            : (
            <Tooltip arrow title="Add/Delete Friend">
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonAddIcon sx={{ color: 'black' }}/>
                </Avatar>
              </IconButton>
            </Tooltip>
              )}
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ padding: 2 }}>{post?.postContent}</Typography>
          {(post?.picture)
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
        deleteFun={() => { void deleteService(post._id) }}
        anchorElFun={anchorElMenu}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
    </>
  )
}

export default Post
