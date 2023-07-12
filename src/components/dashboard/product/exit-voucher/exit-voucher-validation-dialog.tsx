import { useValidateExitVoucherMutation } from '@/queries/exit-voucher'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type ExitVoucherValidateDialogProps = {
  item?: ExitVoucher
  open?: boolean
  onClose: () => void
}

function ExitVoucherValidateDialog({
  item,
  onClose,
  open = false,
}: ExitVoucherValidateDialogProps) {
  const mutation = useValidateExitVoucherMutation()
  const { t } = useTranslation()

  const validate = () => {
    if (!item) {
      return
    }

    return toast.promise(mutation.mutateAsync({ exitVoucherId: item.id }), {
      loading: t('toast.Saving'),
      success: () => {
        onClose()
        return t('toast.SavedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Validate exitVoucher order</DialogTitle>
      <DialogContent>
        <Typography mb={2} color="text.secondary">
          Confirm the Validation action
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={validate} variant="contained">
          Validate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExitVoucherValidateDialog
