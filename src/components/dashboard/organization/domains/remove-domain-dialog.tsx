import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRemoveDomainMutation } from '@/queries/domains'
import toast from 'react-hot-toast'

type RemoveDomainDialogProps = {
  domain?: Domain
} & DialogProps
export default function RemoveDomainDialog({
  domain,
  onClose,
  ...otherProps
}: RemoveDomainDialogProps) {
  const { t } = useTranslation()
  const mutation = useRemoveDomainMutation()

  const closeDialog = (event?: MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose(event || {}, 'backdropClick')
    }
  }

  const onRemove = () => {
    if (!domain) {
      return
    }
    toast.promise(mutation.mutateAsync(domain.id), {
      loading: t('toast.Creating'),
      success: () => {
        closeDialog()
        return t('toast.CreatedSuccessfully')
      },
      error: (error) => error.response.data?.message,
    })
  }

  return (
    <Dialog {...otherProps}>
      <DialogTitle>{t('domain.removeDomain')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('domain.confirmRemoveDomain', { domain: domain?.name })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          {t('domain.cancel')}
        </Button>
        <Button variant="contained" color="error" onClick={onRemove}>
          {t('domain.remove')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
