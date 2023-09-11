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
      <Box>
        <img onClick={handleOpen} alt="post-image" className="post-image" src={src} loading='lazy'/>
      </Box>
      <Modals openFun={open} handleClose={handleClose} size={450} pySize={0} pxSize={0}>
        <Box display='flex'>
        <img alt="post-image" className="modal-image" src={src}/>
        </Box>
      </Modals>
    </>
  )
}

export default PostImage
