import { Box, Tooltip, IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import { EmojiMenu } from './MenuPosts'
import './styles.css'
import data from '@emoji-mart/data'
import { type ChangeEvent } from 'react'
import useMenu from '../../utils/hooks/useMenu'

const CreatePostWidget = ({
  isPicture,
  handleChange
}: {
  isPicture: boolean | undefined
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
  const { anchorEl, openMenu, handleClickMenu, handleCloseMenu } = useMenu()

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
            onClick={handleClickMenu}
            aria-controls={openMenu ? 'emoji-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
          >
            <EmojiEmotionsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <EmojiMenu
        data={data}
        id="emoji-menu"
        anchorElFun={anchorEl}
        openFun={openMenu}
        closeFun={handleCloseMenu}
      />
    </>
  )
}

export default CreatePostWidget
