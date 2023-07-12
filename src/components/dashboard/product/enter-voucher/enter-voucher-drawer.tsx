import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { ResourceError } from '@/components/resource-error'
import VoucherDetailsSkelton from '@/components/voucher-details-skelton'
import {
  useEnterVoucherDetailsQuery,
  useUpdateEnterVoucherMutation,
} from '@/queries/enter-voucher'
import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import EnterVoucherForm from './enter-voucher-form'

type EnterVoucherDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    enterVoucher?: EnterVoucher
  }

function EnterVoucherDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  enterVoucher,
}: EnterVoucherDrawerProps) {
  const { data, isLoading, isSuccess, isError } = useEnterVoucherDetailsQuery(
    enterVoucher?.id,
  )

  const mutation = useUpdateEnterVoucherMutation()
  const { t } = useTranslation()

  const onSubmit = async (data: Partial<EnterVoucherFormData>) => {
    if (!enterVoucher?.id) {
      return
    }
    return toast.promise(
      mutation.mutateAsync({ data, enterVoucherId: enterVoucher.id }),
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
        {isLoading && <VoucherDetailsSkelton />}
        {isError && <ResourceError sx={{ mt: 3 }} />}
        {isSuccess && (
          <EnterVoucherForm
            fromId="enter-voucher-edit"
            key={String(enterVoucher?.id)}
            initialValues={data}
            isEditMode
            isDraftMode={enterVoucher?.state === 'Draft'}
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </InternalDrawer>
  )
}

export default EnterVoucherDrawer
