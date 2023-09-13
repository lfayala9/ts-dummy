import { Box, Tooltip, IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import { EmojiMenu } from '../../containers/MenuPosts'
import './styles.css'
import data from '@emoji-mart/data'
import { useState, type MouseEvent, type ChangeEvent } from 'react'

const CreatePostWidget = ({
  isPicture,
  handleChange
}: {
  isPicture: boolean | undefined
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
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
      <Box className="buttons-widget">
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
            <ImageIcon color={isPicture === true ? 'primary' : 'inherit'} />
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
      <EmojiMenu
        data={data}
        id="emoji-menu"
        anchorElFun={anchorEl}
        openFun={openEmoji}
        closeFun={handleCloseEmoji}
      />
    </>
  )
}

export default CreatePostWidget
