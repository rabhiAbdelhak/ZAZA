import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { ResourceError } from '@/components/resource-error'
import VoucherDetailsSkelton from '@/components/voucher-details-skelton'
import {
  useExitVoucherDetailsQuery,
  useUpdateExitVoucherMutation,
} from '@/queries/exit-voucher'
import { useUpdateSupplierMutation } from '@/queries/supplier'
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ExitVoucherForm from './exit-voucher-form'

type ExitVoucherDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    exitVoucher?: ExitVoucher
  }

function ExitVoucherDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  exitVoucher,
}: ExitVoucherDrawerProps) {
  const { data, isLoading, isSuccess, isError } = useExitVoucherDetailsQuery(
    exitVoucher?.id,
  )

  const mutation = useUpdateExitVoucherMutation()
  const { t } = useTranslation()

  const onSubmit = async (data: Partial<ExitVoucherFormData>) => {
    if (!exitVoucher?.id) {
      return
    }
    return toast.promise(
      mutation.mutateAsync({ data, exitVoucherId: exitVoucher.id }),
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
      />{' '}
      <Box sx={{ px: 2, mt: 2 }}>
        {isLoading && <VoucherDetailsSkelton />}
        {isError && <ResourceError sx={{ mt: 3 }} />}
        {isSuccess && (
          <ExitVoucherForm
            fromId="exit-voucher-edit"
            key={String(exitVoucher?.id)}
            initialValues={data}
            isEditMode
            isDraftMode={exitVoucher?.state === 'Draft'}
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </InternalDrawer>
  )
}

export default ExitVoucherDrawer
