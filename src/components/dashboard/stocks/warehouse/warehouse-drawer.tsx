import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { ResourceError } from '@/components/resource-error'
import VoucherDetailsSkelton from '@/components/voucher-details-skelton'
import {
  useWarehouseDetailsQuery,
  useUpdateWarehouseMutation,
} from '@/queries/warehouse'
import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import WarehouseForm from './warehouse-form'

type WarehouseDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    warehouse?: Warhouse
  }

function WarehouseDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  warehouse,
}: WarehouseDrawerProps) {
  const { data, isLoading, isSuccess, isError } = useWarehouseDetailsQuery(
    warehouse?.id,
  )

  const mutation = useUpdateWarehouseMutation()
  const { t } = useTranslation()

  const onSubmit = async (data: Partial<WarehouseFormData>) => {
    if (!warehouse?.id) {
      return
    }
    return toast.promise(mutation.mutateAsync({ ...data, id: warehouse.id }), {
      loading: t('toast.Saving'),
      success: () => {
        return t('toast.SavedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
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
        {isLoading && <VoucherDetailsSkelton />}
        {isError && <ResourceError sx={{ mt: 3 }} />}
        {isSuccess && (
          <WarehouseForm
            fromId="warehouse-edit"
            key={String(warehouse?.id)}
            initialValues={data}
            isEditMode
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </InternalDrawer>
  )
}

export default WarehouseDrawer
