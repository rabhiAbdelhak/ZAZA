import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { ResourceError } from '@/components/resource-error'
import {
  useSupplierDetailsQuery,
  useUpdateSupplierMutation,
} from '@/queries/supplier'
import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import SupplierDetailSkeleton from './supplier-detail-skeleton'
import SupplierForm from './supplier-form'

type SupplierDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    supplier?: Supplier
  }

function SupplierDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  supplier,
}: SupplierDrawerProps) {
  const { data, isLoading, isSuccess, isError } = useSupplierDetailsQuery(
    supplier?.id,
  )

  const mutation = useUpdateSupplierMutation()
  const { t } = useTranslation()

  const onSubmit = (data: Partial<Supplier>, helpers: any) => {
    return toast.promise(mutation.mutateAsync({ ...data, id: supplier?.id }), {
      loading: t('toast.Saving'),
      success: (d) => {
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
      />
      <Box sx={{ px: 2 }}>
        {isLoading && <SupplierDetailSkeleton />}
        {isError && <ResourceError sx={{ mt: 3 }} />}
        {isSuccess && (
          <SupplierForm
            disabled={mutation.isLoading}
            key={String(supplier?.id)}
            initialValues={data}
            editMode
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </InternalDrawer>
  )
}

export default SupplierDrawer
