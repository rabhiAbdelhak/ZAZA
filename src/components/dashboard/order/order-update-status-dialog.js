import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { statusList } from '../../../constants/order-statuses'

//local status
import { X as XIcon } from '../../../icons/x'
import { useUpdateOrderStatusMutation } from '../../../queries/order'
import { InputField } from '../../input-field'
import { StatusBadge } from '../../status-badge'

const OrderUpdateStatusDialog = ({
  open,
  onClose,
  selectedOrders,
  orderid,
}) => {
  const ids = orderid ? [orderid] : [...selectedOrders]
  const mutation = useUpdateOrderStatusMutation()
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      status: 2,
      reason: '',
      convert_to_package: false,
    },
    onSubmit: (values, helpers) => {
      const result = toast.promise(
        mutation.mutateAsync({ order_ids: ids, status: values.status }),
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
      return result
    },
  })

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: 500,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Typography color="textPrimary" variant="inherit">
          {t('Attributes.Status')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <InputField
          select
          fullWidth
          error={Boolean(formik.touched.status && formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          type="text"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
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
        {formik.values.status === 3 && (
          <InputField
            fullWidth
            multiline
            name="reason"
            label="Reason for marking as failed"
            InputProps={{
              sx: {
                height: formik.values.status === 3 ? '100px' : 0,
                overflow: 'hidden',
                transition: '1000ms',
              },
            }}
            value={formik.values.failed_reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}
        {formik.values.status === 1 && (
          <FormControlLabel
            control={<Checkbox />}
            color="success"
            value={formik.values.convert_to_package}
            label="Convert to Package"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          sx={{ color: 'primary.contrast' }}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderUpdateStatusDialog
