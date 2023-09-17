import { Box } from '@mui/material'
import Modals from '../../containers/Modals'
import useModal from '../../utils/hooks/useModal'
import './styles.css'

const PostImage = ({ src }: { src: string }): JSX.Element => {
  const { open, handleOpen, handleClose } = useModal()

  return (
    <>
      <Box>
        <img onClick={handleOpen} alt="post-image" className="post-image" src={src} loading='lazy'/>
      </Box>
      <Modals openFun={open} handleClose={handleClose} size={350} pySize={0} pxSize={0}>
        <Box display='flex'>
        <img alt="post-image" className="modal-image" src={src}/>
        </Box>
      </Modals>
    </>
  )
}

export default PostImage
