import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'

//local imports
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'

const PackageDeliveryInfoDialog = ({ pack, open, onClose }) => {
  const {
    delivery_type,
    delivery_price,
    weight,
    extra_weight_price,
    can_be_opened,
    observation,
  } = pack
  const formik = useFormik({
    initialValues: {
      delivery_type,
      delivery_price,
      weight,
      extra_weight_price,
      can_be_opened: can_be_opened ? can_be_opened : false,
      observation,
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
          Edit Delivery info
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
              delivery_type="text"
              label="Type"
              name="delivery_type"
              value={formik.values.delivery_type}
              disabled
            />
            <InputField
              fullWidth
              disabled
              delivery_type="number"
              label="Cost"
              name="delivery_price"
              value={formik.values.delivery_price}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <InputField
              fullWidth
              delivery_type="number"
              label="Weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
            />
            <InputField
              fullWidth
              delivery_type="text"
              label="Cost Extra Weight"
              name="extra_weight_price"
              value={formik.values.extra_weight_price}
              disabled
            />
          </Box>
          <Box>
            <Typography>OpenPackage</Typography>
            <Switch
              name="can_be_opened"
              checked={formik.values.can_be_opened}
              onChange={formik.handleChange}
            />
          </Box>
          <InputField
            delivery_type="text"
            name="observation"
            label="Aditional observation"
            multiline
            value={formik.values.observation}
            onChange={formik.handleChange}
            fullWidth
            InputProps={{ sx: { minHeight: 100 } }}
            placeholder="Add observation here..."
          />
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

export default PackageDeliveryInfoDialog
