import { useRouter } from 'next/router'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { usePopover } from '../../../hooks/use-popover'
import { DotsVertical as DotsVerticalIcon } from '../../../icons/dots-vertical'
import OrderUpdateStatusDialog from './order-update-status-dialog'
import { useState } from 'react'
import AssignToUserDialog from './orders-assign-user-dialog'
import { useTranslation } from 'react-i18next'

export const OrderMenu = (props) => {
  const { orderid, assignedto } = props
  const router = useRouter()
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [openUserAssignDialog, setOpenUserAssignDialog] = useState(false)
  const { t } = useTranslation()
  const handleChangeStatus = () => {
    handleClose()
    setIsStatusDialogOpen(true)
  }

  const handleAssign = () => {
    handleClose()
    setOpenUserAssignDialog(true)
  }

  const handleEdit = () => {
    router.push(`/dashboard/orders/${orderid}`)
  }

  return (
    <>
      <IconButton
        onClick={(event) => {
          handleOpen()
          event.stopPropagation()
        }}
        ref={anchorRef}
        {...props}
      >
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
        <MenuItem onClick={handleEdit}>{t('Edit')}</MenuItem>
        <MenuItem onClick={handleChangeStatus}>
          {t('orders.Change Status')}
        </MenuItem>
        <MenuItem onClick={handleAssign}>{t('orders.Assign To User')}</MenuItem>
      </Menu>
      <AssignToUserDialog
        open={openUserAssignDialog}
        onClose={() => setOpenUserAssignDialog(false)}
        orderid={orderid}
        assignedto={assignedto}
      />
      <OrderUpdateStatusDialog
        orderid={orderid}
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
      />
    </>
  )
}
