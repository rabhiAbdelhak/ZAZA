import { InfoRounded } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'
import { initializeAlertDialogStatus } from '../contexts/global context/actions/component-actions'

//local imports
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../contexts/global context/Provider'

const AlertDialog = () => {
  const { t } = useTranslation()
  const {
    componentState: {
      alertDialogStatus: { open, message, title, buttonText, onConfirm },
    },
  } = useGlobaleStateContext()
  const { componentDispatch: dispatch } = useGlobaleDispatchContext()
  return (
    <Dialog
      open={open}
      onClose={() => initializeAlertDialogStatus()(dispatch)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <InfoRounded color="error" sx={{ fontSize: '30px' }} /> {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => initializeAlertDialogStatus()(dispatch)}
          color="secondary"
        >
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => {
            onConfirm()
            initializeAlertDialogStatus()(dispatch)
          }}
          variant="contained"
          color="error"
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
