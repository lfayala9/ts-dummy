import { type ReactNode } from 'react'
import { useAppSelector } from '../utils/hooks/selector'
import { Box, Modal } from '@mui/material'

const Modals = ({
  openFun,
  handleClose,
  children,
  size,
  pxSize,
  pySize
}: {
  openFun: boolean
  handleClose: () => void
  children: ReactNode
  size: number
  pxSize: number
  pySize: number
}): JSX.Element => {
  const { theme } = useAppSelector((state) => state.settings)

  const style = {
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size,
    bgcolor:
      theme === 'light'
        ? 'rgba(255, 255, 255, 0.75)'
        : 'rgba(17, 25, 40, 0.75)',
    border: theme === 'light' ? '1px solid #000' : '1px solid #fafafa',
    borderRadius: '2rem',
    boxShadow: 24,
    px: pxSize,
    py: pySize
  }
  return (
    <Modal
      open={openFun}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

export default Modals
