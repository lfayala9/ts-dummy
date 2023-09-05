import {
  Tooltip,
  Box,
  Avatar,
  Divider,
  IconButton,
  Button
} from '@mui/material'
import './styles.css'
import { CustomField, Wrapper } from '../../styles/components'
import React, { useState, type MouseEvent, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/selector'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import { EmojiMenu } from '../../containers/MenuPosts'
import data from '@emoji-mart/data'
import { postService } from '../../services/posts'
import LoaderRing from '../Widgets/Loader'

const CreatePost: React.FC = () => {
  const { theme } = useAppSelector((state) => state.settings)
  const { user, token, isLoading } = useAppSelector((state) => state.auth)
  const [clear, setClear] = useState<string>()
  const [isPicture, setIsPicture] = useState(false)
  // Posts service

  const defaultValue = {
    userId: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    postContent: '',
    picture: null as File | null
  }
  const [form, setForm] = useState(defaultValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'picture') {
      const file = e.target.files != null ? e.target.files[0] : null
      setForm({ ...form, [e.target.name]: file })
      setIsPicture(true)
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }
  const dispatch = useAppDispatch()
  const handlePost = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    }
    void dispatch(postService(formData, token))
  }

  // Emoji menu

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openEmoji = Boolean(anchorEl)
  const handleClickEmoji = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseEmoji = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <Wrapper className='mainPostBox'>
        <form noValidate onSubmit={handlePost} encType="multipart/form-data">
          <Box className="create-postBox">
            <Avatar className="avatar-medium">
              <PostAddIcon sx={{ color: 'black' }} />
            </Avatar>
            <CustomField
              onChange={handleChange}
              name="postContent"
              fullWidth
              value={clear}
              id="filled-multiline-static"
              multiline
              placeholder="What are you thinking...?"
              variant="outlined"
              sx={{
                backgroundColor: theme === 'light' ? '#BDBDBD' : '#757575',
                borderRadius: '2rem'
              }}
            />
          </Box>
          <Divider />
          <Box className='buttons-container'>
            <Box className='buttons-widget'>
              <Tooltip arrow title="Attach File">
                <IconButton component="label">
                  <input type="file" hidden />
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Picture">
                <IconButton component="label">
                  <input
                    name="picture"
                    onChange={handleChange}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                  <ImageIcon color={isPicture ? 'primary' : 'inherit'}/>
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Select Emoji">
                <IconButton
                  onClick={handleClickEmoji}
                  aria-controls={openEmoji ? 'emoji-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openEmoji ? 'true' : undefined}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  setClear('')
                  setIsPicture(false)
                }}
                color="primary"
                aria-label="POST button"
              >
                POST
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
        </form>
      </Wrapper>
      {isLoading && <LoaderRing position="relative" top="10px" left="44%" />}
    </>
  )
}

export default CreatePost
