import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { IconButton, Menu, MenuItem } from '@mui/material'

//local imports
import { usePopover } from '../../../../hooks/use-popover'
import { DotsVertical as DotsVerticalIcon } from '../../../../icons/dots-vertical'
import { useGlobaleDispatchContext } from '../../../../contexts/global context/Provider'
import { setAlertDialogStatus } from '../../../../contexts/global context/actions/component-actions'
import { useTranslation } from 'react-i18next'

const PaymentMenu = (props) => {
  const { paymentid, confirmpayment } = props
  const router = useRouter()
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const { componentDispatch } = useGlobaleDispatchContext()
  const { t } = useTranslation()
  const handleAddTicket = () => {
    handleClose()
    toast.error(
      'This action is not available yet, it needs some data from api!',
    )
  }

  const handleConfirmPayment = () => {
    setAlertDialogStatus({
      message: t(
        "payments.Are you sure you want to Confirm this payment ? This can't be undone.",
      ),
      title: t('payments.Confirm Payment'),
      type: 'success',
      open: true,
      buttonText: t('Confirm'),
      onConfirm: () => confirmpayment(paymentid),
    })(componentDispatch)
    handleClose?.()
  }

  const handlePrint = () => {
    handleClose()
    toast.error('This action is not available yet, it needs to be understood !')
  }

  const handleModify = () => {
    router.push(`/dashboard/payments/${paymentId}`)
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
        <MenuItem onClick={handleAddTicket}>
          {t('payments.Payment Details')}
        </MenuItem>
        <MenuItem onClick={handleConfirmPayment} sx={{ color: 'success' }}>
          {t('Confirm')}
        </MenuItem>
        <MenuItem onClick={handlePrint}>{t('Print')}</MenuItem>
        <MenuItem onClick={handleModify}>{t('Export')}</MenuItem>
      </Menu>
    </>
  )
}

export default PaymentMenu
