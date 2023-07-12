import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useCreateEnterVoucherMutation } from '@/queries/enter-voucher'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import EnterVoucherForm from './enter-voucher-form'

function CreateEnterVoucher({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const { t } = useTranslation()
  const createMutation = useCreateEnterVoucherMutation()

  const onSubmit = async (data: Partial<EnterVoucherFormData>) => {
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
          <EnterVoucherForm fromId="enter-voucher-form" onSubmit={onSubmit} />
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={toggleOpen} color="inherit">
            Cancel
          </Button>
          <Button form="enter-voucher-form" type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateEnterVoucher
