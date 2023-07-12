import { Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  useProductDetailQuery,
  useUpdateLandingMutation,
} from '../../queries/landing'
import LoadingDetailsComponent from '../loading-details-component'
import { ResourceError } from '../resource-error'
import EditLandingForm from './edit-landing-form'
import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'

type LandingDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    landing?: any
    landingId: number
    open: boolean
    onClose: () => void
    goNext: () => void
    goPrev: () => void
  }

export default function EditLandingDrawer({
  landingId,
  open,
  onClose,
  goNext,
  goPrev,
  sx,
}: LandingDrawerProps) {
  const { data, isLoading, isSuccess, refetch, isError } =
    useProductDetailQuery(landingId, {
      enabled: Boolean(landingId && open),
    }) as any
  const { t } = useTranslation()

  const mutation = useUpdateLandingMutation()

  const onSubmit = async (values: any, helpers: any) => {
    return toast.promise(mutation.mutateAsync({ landingId, data: values }), {
      loading: t('toast.Saving'),
      success: () => {
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err?.response?.data?.message })
        return err?.response?.data?.message
      },
    })
  }

  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={goNext}
        onPrev={goPrev}
        disabled={mutation.isLoading}
        onClose={onClose}
      />
      <Typography color="textPrimary" variant="h4" sx={{ px: 4 }}>
        {data?.name}
      </Typography>
      {isLoading && <LoadingDetailsComponent />}
      {isSuccess && (
        <EditLandingForm initialValues={data} onSubmit={onSubmit} />
      )}
      {isError && <ResourceError onReload={refetch} />}
    </InternalDrawer>
  )
}
