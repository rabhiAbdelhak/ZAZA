import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function OrderConfirmationDialog({
  title,
  open,
  message,
  onConfirm,
  onCancel,
  onClose,
}) {
  const { t } = useTranslation()
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        role="alertdialog"
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 2,
          px: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {t(title)}
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          <Typography
            id="alert-dialog-modal-description"
            variant="subtitle1"
            color="text.primary"
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button variant="outlined" color="secondary" onClick={() => onCancel()}>
          {t('NO')}
        </Button>
        <Button variant="contained" color="error" onClick={() => onConfirm()}>
          {t('YES')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
