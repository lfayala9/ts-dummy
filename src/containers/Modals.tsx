import { useAppSelector } from '../utils/hooks/selector'
import { Box, Modal } from '@mui/material'

const Modals = ({ openFun, handleClose, children, size }: { openFun: boolean, handleClose: () => void, children: any, size: number }): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size,
    bgcolor: theme === 'light' ? '#fafafa' : '#050505',
    border: theme === 'light' ? '2px solid #000' : '2px solid #fafafa',
    borderRadius: '2rem',
    boxShadow: 24,
    px: 2,
    py: 4
  }
  return (
    <Modal
        open={openFun}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
  )
}

export default Modals
