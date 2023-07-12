import { Dialog, DialogProps, IconButton } from '@mui/material'
import SheetWizard, { SheetWizardProps } from './SheetWizard'
import { X as XIcon } from '../../icons/x'
import toast from 'react-hot-toast'

type SheetDialogProps = DialogProps & SheetWizardProps

export default function SheetDialog({
  file,
  open,
  onClose,
  ...dialogProps
}: SheetDialogProps) {
  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      fullWidth
      maxWidth="xl"
      PaperProps={{
        sx: { height: '100%', position: 'relative', overflow: 'hidden' },
      }}
      {...dialogProps}
    >
      <SheetWizard
        file={file}
        onSuccess={() => toast.success('Uploaded successfully')}
      />
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={() => onClose && onClose({}, 'backdropClick')}
      >
        <XIcon />
      </IconButton>
    </Dialog>
  )
}
