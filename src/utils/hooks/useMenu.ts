import { useState, type MouseEvent } from 'react'
const useMenu = (): {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  openMenu: boolean
  handleClickMenu: (e: MouseEvent<HTMLElement>) => void
  handleCloseMenu: () => void
} => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClickMenu = (e: MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = (): void => {
    setAnchorEl(null)
  }
  return {
    anchorEl,
    setAnchorEl,
    openMenu,
    handleClickMenu,
    handleCloseMenu
  }
}

export default useMenu
