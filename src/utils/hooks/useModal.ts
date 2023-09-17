import { useState } from 'react'

const useModal = (): {
  open: boolean
  setOpen: (open: boolean) => void
  handleOpen: () => void
  handleClose: () => void
} => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return {
    open,
    setOpen,
    handleOpen,
    handleClose
  }
}

export default useModal
