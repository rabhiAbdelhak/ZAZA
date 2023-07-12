import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { usePopover } from '../../../hooks/use-popover'
import { DotsVertical as DotsVerticalIcon } from '../../../icons/dots-vertical'

export const ProductMenu = (props) => {
  const router = useRouter()
  const [anchorRef, open, handleOpen, handleClose] = usePopover()

  const handleEdit = () => {
    handleClose()
    router.push('/dashboard/products/1')
  }

  const handleArchive = () => {
    handleClose()
    toast.error('This action is not available on demo')
  }

  const handleDelete = () => {
    handleClose()
    toast.error('This action is not available on demo')
  }

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef} {...props}>
        <DotsVerticalIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleArchive}>Archive</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  )
}
