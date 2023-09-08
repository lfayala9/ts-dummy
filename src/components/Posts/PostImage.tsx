import { useState } from 'react'
import { Box } from '@mui/material'
import Modals from '../../containers/Modals'
import './styles.css'

const PostImage = ({ src }: { src: string }): JSX.Element => {
  const [open, setOpen] = useState(false)
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Box
        onClick={handleOpen}
      >
        <img alt="post-image" className="post-image" src={src} />
      </Box>
      <Modals openFun={open} handleClose={handleClose} size={500}>
        <img alt="post-image" className="modal-image" src={src}/>
      </Modals>
    </>
  )
}

export default PostImage
