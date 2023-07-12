import { Box, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { StatusBadge } from '../../status-badge'
import { useUpdateOrderStatusMutation } from '../../../queries/order'
import toast from 'react-hot-toast'

const statusList = [
  {
    id: 0,
    name: 'New',
    color: 'info.main',
  },
  {
    id: 1,
    name: 'Confirmed',
    color: 'success.main',
  },
  {
    id: 2,
    name: 'Canceled',
    color: 'error.main',
  },
  {
    id: 3,
    name: 'Failed',
    color: 'warning.main',
  },
]

const OrderStatusForm = ({ order }) => {
  const { t } = useTranslation()
  const mutation = useUpdateOrderStatusMutation(order.id)
  const formik = useFormik({
    initialValues: {
      status: order.status,
    },
    onSubmit: (values, helpers) => {
      const result = toast.promise(
        mutation.mutateAsync({ order_ids: [order.id], status: values.status }),
        {
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
        },
      )
      onClose()
      return result
    },
  })

  const handleStatusChange = (id) => {
    formik.setFieldValue('status', id)
    formik.handleSubmit()
  }

  const currentStatusVariant =
    statusList.find((st) => st.id === order.status) ||
    statusList.find((st) => st.id === 3)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        {statusList.map((status, index) => {
          return (
            index !== 0 && (
              <Button
                variant="contained"
                color={status.color.split('.')[0]}
                sx={{ minWidth: '150px' }}
                onClick={() => handleStatusChange(status.id)}
              >
                {t(status.name)}
              </Button>
            )
          )
        })}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            borderRadius: '20px',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            bgcolor: currentStatusVariant.color,
          }}
        >
          <StatusBadge color="primary.contrast" />
          <Typography variant="body2" color="primary.contrast">
            {currentStatusVariant.id >= 3
              ? t(order.status_name)
              : t(currentStatusVariant.name)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.disabled">
          {t('Updated')}:{' '}
          {format(new Date(order.created_at), 'dd-MM-yyyy hh:mm')}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderStatusForm
