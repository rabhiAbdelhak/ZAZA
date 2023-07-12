import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type LostMappingAlertProps = {
  open?: boolean
  onClose?: () => void
  onAgree?: () => void
  onDisagree?: () => void
}

function LostMappingAlert({
  open = false,
  onClose,
  onAgree,
  onDisagree,
}: LostMappingAlertProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Changing column header?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear all changes to data in progress in this
          stage?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onDisagree}>
          No
        </Button>
        <Button variant="contained" onClick={onAgree} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LostMappingAlert
