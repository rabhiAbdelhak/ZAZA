import toast from 'react-hot-toast'
import { usePopover } from '../../../hooks/use-popover'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { DotsVertical as DotsVerticalIcon } from '../../../icons/dots-vertical'

const PackageMenu = (props) => {
  const { packid, onPrint } = props
  const router = useRouter()
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const { t } = useTranslation()

  const handleAddTicket = () => {
    handleClose()
    toast.error(
      'This action is not available yet, it needs some data from api!',
    )
  }

  const handlePrint = () => {
    handleClose()
    onPrint && onPrint(packid)
  }

  const handleModify = () => {
    router.push(`/dashboard/pacakges/${packid}`)
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
        <MenuItem onClick={handleModify}>{t('Edit')}</MenuItem>
        <MenuItem onClick={handlePrint}>{t('Print')}</MenuItem>
        <MenuItem onClick={handleAddTicket}>Add a ticket</MenuItem>
      </Menu>
    </>
  )
}

export default PackageMenu
