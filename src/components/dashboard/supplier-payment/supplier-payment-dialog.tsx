import { InputField } from '@/components/input-field'
import {
  useAddSupplierPaymentsMutation,
  useSupplierDetailsQuery,
  useUpdateSupplierPaymentsMutation,
} from '@/queries/supplier'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
} from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import SupplierPaymentForm from './supplier-payment-form'

type SupplierPaymentDialogProps = {
  open?: boolean
  onClose?: () => void
  onAddSuccess?: () => void
  supplierId?: number
  initPayment?: SupplierPayment
  withAutoComplete?: boolean
}

function SupplierPaymentDialog({
  open = false,
  initPayment,
  supplierId,
  withAutoComplete = false,
  onClose,
  onAddSuccess,
}: SupplierPaymentDialogProps) {
  const { t } = useTranslation()
  const addMutation = useAddSupplierPaymentsMutation()
  const updateMutation = useUpdateSupplierPaymentsMutation()
  const { data: supplier, isLoading } = useSupplierDetailsQuery(supplierId)

  const handleSubmit = (data: {
    amount: number
    date: string
    supplier: Supplier
  }) => {
    const promise = initPayment
      ? updateMutation.mutateAsync({
          amount: data.amount,
          date: data.date,
          supplier_id: data.supplier.id,
          paymentId: initPayment.id,
        })
      : addMutation.mutateAsync({
          amount: data.amount,
          date: data.date,
          supplier_id: data.supplier.id,
        })

    return toast.promise(promise, {
      loading: t('toast.Saving'),
      success: () => {
        onClose && onClose()
        initPayment && onAddSuccess ? onAddSuccess() : undefined
        return t('toast.SavedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }

  const loading = initPayment ? isLoading : false
  const disabled = addMutation.isLoading
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { minHeight: '50vh' } }}
    >
      {loading && (
        <Box sx={{ p: 2 }}>
          <Skeleton />
          <Box>
            <Skeleton height={50} />
            <Skeleton height={50} />
          </Box>
        </Box>
      )}
      {!loading && (
        <>
          <DialogTitle>
            {initPayment ? 'Edit payment' : 'Add payment'}
          </DialogTitle>
          <DialogContent>
            <SupplierPaymentForm
              withAutoComplete={withAutoComplete}
              initValues={initPayment}
              initSupplier={supplier}
              onSubmit={handleSubmit}
              formId="supplier-payment-form"
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={disabled} onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button
              disabled={disabled}
              type="submit"
              variant="contained"
              form="supplier-payment-form"
            >
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default SupplierPaymentDialog
