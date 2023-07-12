import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { InputField } from '../../input-field'
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
    if (order.status === 2 || order.status === 1) {
      toast.error("You can't change the status")
      return
    }
    if (id === 3) {
      if (order.status < 8 && order.status >= 3) {
        id = order.status + 1
      } else if (id >= 8) {
        id = 2
      }
    }
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
        gap: 3,
        p: 2,
      }}
    >
      <InputField
        select
        fullWidth
        error={Boolean(formik.touched.status && formik.errors.status)}
        helperText={formik.touched.status && formik.errors.status}
        type="text"
        name="status"
        value={formik.values.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        onBlur={formik.handleBlur}
      >
        {statusList.map(
          (option, index) =>
            index > 0 && (
              <MenuItem
                key={option.id}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
                value={option.id}
              >
                <StatusBadge
                  color={option.color}
                  sx={{
                    backgroundColor: option.color,
                    mr: 1,
                  }}
                />
                <Typography variant="body2" color={option.color}>
                  {t(option.name)}
                </Typography>
              </MenuItem>
            ),
        )}
      </InputField>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* <Box sx={{display: "flex", alignItems: "center", gap:1}}>
        <StatusBadge color={currentStatusVariant.color}/>
        <Typography variant="body2" color={currentStatusVariant.color}>
          {currentStatusVariant.id >= 3 ? t(order.status_name) : t(currentStatusVariant.name)}
        </Typography>
      </Box> */}
        <Typography variant="caption" color="text.disabled">
          {t('Updated')}:{' '}
          {format(new Date(order.created_at), 'dd-MM-yyyy hh:mm')}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderStatusForm
