import { useValidatePurchaseOrderMutation } from '@/queries/purchase-orders'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type PurchaseOrderValidateDialogProps = {
  item?: PurchaseOrder
  open?: boolean
  onClose: () => void
}
type Payment = 'paid' | 'unpaid'

function PurchaseOrderValidateDialog({
  item,
  onClose,
  open = false,
}: PurchaseOrderValidateDialogProps) {
  const [payment, setPayment] = useState<Payment>('paid')
  const mutation = useValidatePurchaseOrderMutation()
  const { t } = useTranslation()

  const validate = () => {
    if (!item) {
      return
    }

    return toast.promise(
      mutation.mutateAsync({ purchaseId: item.id, isPaid: payment === 'paid' }),
      {
        loading: t('toast.Saving'),
        success: () => {
          onClose()
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Validate purchase order</DialogTitle>
      <DialogContent>
        <Typography mb={2} color="text.secondary">
          Select the payment state of the purchase order
        </Typography>

        <RadioGroup
          value={payment}
          onChange={(event, value) => setPayment(value as Payment)}
        >
          <FormControlLabel value="paid" control={<Radio />} label="Paid" />
          <FormControlLabel
            value="unpaid"
            control={<Radio />}
            label="Deferred payment"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={validate} variant="contained">
          Validate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PurchaseOrderValidateDialog
