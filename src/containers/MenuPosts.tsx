import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Picker from '@emoji-mart/react'

export const EmojiMenu = ({
  data,
  anchorElFun,
  openFun,
  closeFun,
  id,
  selectFun
}: {
  data: unknown
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
  selectFun?: any
}): JSX.Element => {
  return (
      <Menu
        anchorEl={anchorElFun}
        id={id}
        open={openFun}
        onClose={closeFun}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Picker onEmojiSelect={selectFun} data={data} />
      </Menu>
  )
}

export const PostMenu = ({
  anchorElFun,
  openFun,
  closeFun,
  id,
  handleModal
}: {
  anchorElFun: HTMLElement | null
  openFun: boolean
  closeFun: () => void
  id: string
  handleModal: () => void
}): JSX.Element => {
  return (
      <Menu
        anchorEl={anchorElFun}
        id={id}
        open={openFun}
        onClose={closeFun}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleModal}>
          <ListItemIcon>
            <DeleteIcon color='error' fontSize="small" />
          </ListItemIcon>
          Delete Post
        </MenuItem>
        <MenuItem onClick={closeFun}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
      </Menu>
  )
}
