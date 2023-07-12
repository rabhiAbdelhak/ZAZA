import { InfoRounded } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'

export default function LandingDeleteConfirmation({
  open,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} keepMounted onClose={onClose}>
      <DialogTitle>
        <InfoRounded color="error" /> {t('landing.DeleteLandingPage')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {t('landing.deleteLandingMessage')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          {t('Cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={onConfirm}
        >
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
