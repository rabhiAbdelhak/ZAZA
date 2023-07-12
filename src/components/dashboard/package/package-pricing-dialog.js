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

//local imports
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'

const PackagePricingDialog = ({ pack, open, onClose }) => {
  const { price, amount_charge } = pack
  const formik = useFormik({
    initialValues: {
      price,
      new_price: price,
      amount_charge,
      new_amount_charge: amount_charge,
    },
    onSubmit: (values) => {
      alert('need a patch or put route form the api')
    },
  })
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
          Change the Price
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <InputField
              fullWidth
              type="number"
              label="Current Price"
              name="price"
              value={formik.values.price}
              disabled
            />
            <InputField
              fullWidth
              type="number"
              label="New Price"
              name="new_price"
              value={formik.values.new_price}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <InputField
              fullWidth
              disabled
              type="number"
              label="Current Amount to pay"
              name="amount_charge"
              value={formik.values.amount_charge}
            />
            <InputField
              fullWidth
              type="number"
              label="New Amount to pay"
              name="new_amount_charge"
              value={formik.values.new_amount_charge}
              disabled
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          disabled={formik.isSubmitting}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{ color: 'primary.contrast' }}
        >
          Ask for price to change
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PackagePricingDialog
