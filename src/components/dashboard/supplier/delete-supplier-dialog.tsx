import { useRemoveSupplierMutation } from '@/queries/supplier'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type DeleteSupplierDialogProps = DialogProps & {
  supplier?: Supplier
  onSuccess?: () => void
}
function DeleteSupplierDialog({
  supplier,
  onSuccess,
  onClose,
  ...others
}: DeleteSupplierDialogProps) {
  const mutation = useRemoveSupplierMutation()
  const { t } = useTranslation()
  const onRemove = () => {
    if (!supplier?.id) {
      return
    }
    return toast.promise(mutation.mutateAsync(supplier.id), {
      loading: t('toast.Removing'),
      success: () => {
        onSuccess && onSuccess()
        return t('toast.RemovedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }
  return (
    <Dialog {...others}>
      <DialogTitle>Delete supplier</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove supplier <b>{supplier?.name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={mutation.isLoading}
          onClick={() => onClose && onClose({}, 'escapeKeyDown')}
          color="inherit"
        >
          No
        </Button>
        <Button
          disabled={mutation.isLoading}
          onClick={onRemove}
          variant="contained"
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteSupplierDialog
