import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { ResourceError } from '@/components/resource-error'
import {
  usePurchaseOrderDetailsQuery,
  useUpdatePurchaseOrderMutation,
} from '@/queries/purchase-orders'
import { useUpdateSupplierMutation } from '@/queries/supplier'
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import PurchaseOrderDetailSkeleton from './purchase-order-detail-skeleton'
import PurchaseOrderForm from './purchase-order-form'

type PurchaseOrderDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    purchaseOrder?: PurchaseOrder
  }

function PurchaseOrderDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  purchaseOrder,
}: PurchaseOrderDrawerProps) {
  const { data, isLoading, isSuccess, isError } = usePurchaseOrderDetailsQuery(
    purchaseOrder?.id,
  )

  const mutation = useUpdatePurchaseOrderMutation()
  const { t } = useTranslation()

  const onSubmit = async (data: Partial<PurchaseOrderFormData>) => {
    if (!purchaseOrder?.id) {
      return
    }
    return toast.promise(
      mutation.mutateAsync({ data, purchaseId: purchaseOrder.id }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={onNext}
        onPrev={onPrev}
        disabled={mutation.isLoading}
        onClose={onClose}
        // rightAction={<Button size="small">Validate</Button>}
      />
      <Box sx={{ px: 2, mt: 2 }}>
        {isLoading && <PurchaseOrderDetailSkeleton />}
        {isError && <ResourceError sx={{ mt: 3 }} />}
        {isSuccess && (
          <PurchaseOrderForm
            fromId="purchase-form-edit"
            key={String(purchaseOrder?.id)}
            initialValues={data}
            isEditMode
            isDraftMode={purchaseOrder?.state === 'Draft'}
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </InternalDrawer>
  )
}

export default PurchaseOrderDrawer
