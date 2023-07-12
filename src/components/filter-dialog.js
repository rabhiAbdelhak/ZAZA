import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { X as XIcon } from '../icons/x'
import { InputField } from './input-field'
import { useFormik } from 'formik'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../contexts/global context/Provider'

export const FilterDialog = (props) => {
  const { open, onClose } = props
  const {
    ordersState: {
      filters: { min_price, max_price, from, to },
    },
  } = useGlobaleStateContext()

  const { ordersDispatch: dispatch } = useGlobaleDispatchContext()

  const formik = useFormik({
    initialValues: {
      min_price,
      max_price,
      from,
      to,
    },
    validate: (values) => {
      const errors = {}
      if (values.min_price > values.max_price) {
        errors.min_price = 'Min Price must be less then Max Price'
      }
      if (values.from > values.to && values.to) {
        errors.from = 'Start Date must be less then end Date'
      }
      return errors
    },
    onSubmit: (values) => {
      onClose?.()
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
          Filter
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Price Range
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <InputField
              error={formik.touched?.min_price && formik.errors?.min_price}
              helperText={formik.touched?.min_price && formik.errors?.min_price}
              fullWidth
              type="number"
              label="From"
              name="min_price"
              value={formik.values.min_price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputField
              fullWidth
              type="number"
              label="To"
              name="max_price"
              value={
                formik.values.max_price !== Infinity
                  ? formik.values.max_price
                  : ''
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Button
            color="error"
            sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0 }}
          >
            Reset
          </Button>
        </Box>
        <Divider />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Date period
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <InputField
              fullWidth
              error={formik.touched?.from && formik.errors?.from}
              helperText={formik.touched?.from && formik.errors?.from}
              type="date"
              label="From"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputField
              fullWidth
              type="date"
              label="To"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Button
            color="error"
            sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0 }}
          >
            Reset
          </Button>
        </Box>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="text"
          onClick={() => {
            formik.resetForm()
          }}
        >
          Reset
        </Button>
        <Button
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          sx={{ color: 'primary.contrast' }}
        >
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

FilterDialog.defaultProps = {
  open: false,
}

FilterDialog.propTypes = {
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  properties: PropTypes.array.isRequired,
}
