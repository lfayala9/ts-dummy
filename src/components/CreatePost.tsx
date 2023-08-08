import { Box, Avatar, Divider, IconButton, Button } from '@mui/material'
import { CustomField, Wrapper } from '../styles/components'
import React, { useState, type MouseEvent } from 'react'
import { useAppSelector } from '../hooks/selector'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import { EmojiMenu } from './Menus'
import data from '@emoji-mart/data'

const CreatePost: React.FC = () => {
  const { theme } = useAppSelector((state) => state.settings)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openEmoji = Boolean(anchorEl)
  const handleClickEmoji = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseEmoji = (): void => {
    setAnchorEl(null)
  }

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', gap: '10px', mb: 2, alignItems: 'center' }}>
        <Avatar sx={{ width: 54, height: 54, border: '1px solid white' }}>
          <PostAddIcon />
        </Avatar>
        <CustomField
          fullWidth
          id="filled-multiline-static"
          multiline
          placeholder='What are you thinking...?'
          variant="outlined"
          sx={{
            backgroundColor: theme === 'light' ? '#BDBDBD' : '#757575',
            borderRadius: '2rem'
          }}
        />
      </Box>
      <Divider />
      <Box mt={1} display="flex" justifyContent="space-between">
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <IconButton component='label'>
            <input type='file' hidden/>
              <AttachFileIcon />
          </IconButton>
          <IconButton component='label'>
          <input type='file' accept='image/*' hidden/>
            <ImageIcon />
          </IconButton>
          <IconButton
          onClick={handleClickEmoji}
          aria-controls={openEmoji ? 'emoji-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openEmoji ? 'true' : undefined}
          >
            <EmojiEmotionsIcon />
          </IconButton>
        </Box>
        <Box>
          <Button variant="contained" color="primary">
            Post
          </Button>
        </Box>
      <EmojiMenu
      data={data}
            id="emoji-menu"
            anchorElFun={anchorEl}
            openFun={openEmoji}
            closeFun={handleCloseEmoji}
            />
      </Box>
    </Wrapper>
  )
}

export default CreatePost
