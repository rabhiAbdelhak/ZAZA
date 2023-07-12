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
import PurchaseOrderForm from './purchase-order-form'
import { useCreatePurchaseOrderMutation } from '@/queries/purchase-orders'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function CreatePurchaseOrder({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const { t } = useTranslation()
  const createMutation = useCreatePurchaseOrderMutation()

  const onSubmit = async (data: Partial<PurchaseOrderFormData>) => {
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
        <DialogTitle sx={{ p: 2 }}>Create Purchase order</DialogTitle>
        <Box sx={{ p: 2 }}>
          <PurchaseOrderForm fromId="purchase-form-order" onSubmit={onSubmit} />
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={toggleOpen} color="inherit">
            {t('Cancel')}
          </Button>
          <Button form="purchase-form-order" type="submit" variant="contained">
            {t('Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreatePurchaseOrder
