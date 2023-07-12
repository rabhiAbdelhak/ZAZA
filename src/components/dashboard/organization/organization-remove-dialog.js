import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

export const OrganizationRemoveDialog = (props) => {
  const {
    open = false,
    onAgree,
    onDisagree,
    title,
    content,
    isLoading = false,
    isDisable = false,
  } = props

  const { t } = useTranslation()
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isDisable || isLoading}
          autoFocus
          onClick={onDisagree}
        >
          {t('form.Cancel')}
        </Button>
        <Button
          disabled={isDisable || isLoading}
          variant="contained"
          color="error"
          onClick={onAgree}
          startIcon={
            isLoading && (
              <CircularProgress color="inherit" size={20} thickness={6} />
            )
          }
        >
          {t('form.Remove')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

OrganizationRemoveDialog.propTypes = {
  open: PropTypes.bool,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func,
  title: PropTypes.node,
  content: PropTypes.node,
  isLoading: PropTypes.bool,
  isDisable: PropTypes.bool,
}
