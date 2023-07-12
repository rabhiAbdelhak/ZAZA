import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'

const OrderInfoUpdateDialog = ({ open, onClose, data, onSubmit }) => {
  const { order_id, source } = data
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      order_id,
      source,
    },
    onSubmit: (values, helpers) => {
      onSubmit(values, helpers)
      onClose?.()
    },
  })

  return (
    <Dialog
      open={open}
      onClose={() => onClose?.()}
      PaperProps={{
        sx: {
          maxWidth: 700,
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
        <Typography color="text.primary" variant="inherit">
          {t('Edit')} {t('orders.Order Information')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2, display: 'flex', gap: 2 }}>
          <InputField
            fullWidth
            disabled
            label={t('Attributes.Order Number')}
            type="text"
            value={formik.values.order_id}
          />
          <InputField
            fullWidth
            label={t('Attributes.Lead Source')}
            name="source"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.source}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => onClose?.()}
        >
          {t('Cancel')}
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={formik.handleSubmit}
        >
          {t('Edit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderInfoUpdateDialog
