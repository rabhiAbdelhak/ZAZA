import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'

//local imports
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'
import QuantityInput from '../../quantity-input'
const PackageOrderInfoDialog = ({ open, onClose, pack }) => {
  const { tracking_code, name, quantity, price, amount_charge } = pack
  const formik = useFormik({
    initialValues: {
      tracking_code,
      name,
      quantity,
      price,
      amount_charge,
    },
    onSubmit: (values) => {
      alert('We need a patch or put route here from the api!')
    },
  })

  const HandleQuantityChange = (newQuantity) => {
    formik.setFieldValue('quantity', newQuantity)
  }
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      PaperProps={{
        sx: {
          maxWidth: 800,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography color="text.primary" variant="inherit">
          Edit Order info
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
            padding: '30px 0',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <InputField
              disabled
              type="text"
              name="tracking_code"
              value={formik.values.tracking_code}
              label="Tracking Code"
              InputProps={{ sx: { flex: 1 }, readOnly: true }}
            />
            <InputField
              fullWidth
              type="text"
              name="name"
              value={formik.values.name}
              label="Product"
            />
            <QuantityInput
              value={formik.values.quantity}
              max={10}
              handleAmountChange={HandleQuantityChange}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <InputField
              fullWidth
              type="text"
              name="price"
              value={formik.values.price}
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DZD</InputAdornment>
                ),
              }}
            />
            <InputField
              disabled
              fullWidth
              type="text"
              name="amount_charge"
              value={formik.values.amount_charge}
              label="Amount to Charge"
              InputProps={{ readOnly: true }}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          disabled={formik.isSubmitting}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{ color: 'primary.contrast' }}
        >
          Save Modifications
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PackageOrderInfoDialog
