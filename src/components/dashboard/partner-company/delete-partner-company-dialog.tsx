import { useRemovePartnerCompanyMutation } from '@/queries/partner-company'
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

type DeletePartnerCompanyDialogProps = DialogProps & {
  partnerCompany?: PartnerCompany
  onSuccess?: () => void
}
function DeletePartnerCompanyDialog({
  partnerCompany,
  onSuccess,
  onClose,
  ...others
}: DeletePartnerCompanyDialogProps) {
  const mutation = useRemovePartnerCompanyMutation()
  const { t } = useTranslation()
  const onRemove = () => {
    if (!partnerCompany?.id) {
      return
    }
    return toast.promise(mutation.mutateAsync(partnerCompany.id), {
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
      <DialogTitle>{t('Delete partner company')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Are you sure you want to remove this partner company ')}
          <b>{partnerCompany?.name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={mutation.isLoading}
          onClick={() => onClose && onClose({}, 'escapeKeyDown')}
          color="inherit"
        >
          {t('No')}
        </Button>
        <Button
          disabled={mutation.isLoading}
          onClick={onRemove}
          variant="contained"
          color="error"
        >
          {t('Yes')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeletePartnerCompanyDialog
