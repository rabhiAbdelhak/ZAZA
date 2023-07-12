import { useRemoveWarehouseMutation } from '@/queries/warehouse'
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

type WarehouseValidateDialogProps = {
  item?: Warhouse
  open?: boolean
  onClose: () => void
}

function WarehouseValidateDialog({
  item,
  onClose,
  open = false,
}: WarehouseValidateDialogProps) {
  const mutation = useRemoveWarehouseMutation()
  const { t } = useTranslation()

  const Delete = () => {
    if (!item) {
      return
    }
    return toast.promise(mutation.mutateAsync({ warehouseId: item.id }), {
      loading: t('toast.Deleting'),
      success: () => {
        onClose()
        return t('toast.DeletedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Delete Warehouse</DialogTitle>
      <DialogContent>
        <Typography mb={2} color="text.secondary">
          Confirm the Delete action
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('Cancel')}
        </Button>
        <Button onClick={Delete} variant="contained">
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WarehouseValidateDialog
