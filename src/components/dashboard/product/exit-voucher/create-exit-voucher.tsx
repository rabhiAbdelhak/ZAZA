import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
//   import ExitVoucherForm from './purchase-order-form'
import { useCreateExitVoucherMutation } from '@/queries/exit-voucher'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ExitVoucherForm from './exit-voucher-form'

function CreateExitVoucher({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const { t } = useTranslation()
  const createMutation = useCreateExitVoucherMutation()

  const onSubmit = async (data: Partial<ExitVoucherFormData>) => {
    return toast.promise(createMutation.mutateAsync(data), {
      loading: t('toast.Creating'),
      success: () => {
        onSuccess && onSuccess()
        toggleOpen()
        return t('toast.CreatedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }
  return (
    <>
      <Button onClick={toggleOpen} variant="contained" startIcon={<AddIcon />}>
        Create
      </Button>

      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle sx={{ p: 2 }}>Create Exit Voucher</DialogTitle>
        <Box sx={{ p: 2 }}>
          <ExitVoucherForm fromId="exit-voucher-form" onSubmit={onSubmit} />
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={toggleOpen} color="inherit">
            Cancel
          </Button>
          <Button form="exit-voucher-form" type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateExitVoucher
