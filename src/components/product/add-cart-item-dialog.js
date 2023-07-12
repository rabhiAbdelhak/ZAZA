import { Add, CancelOutlined, Remove } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'

//local imports
import { addItemToCart } from '../../contexts/global context/actions/cart-actions'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../contexts/global context/Provider'
import { InputField } from '../input-field'
import { openStatusDrawer } from '../../contexts/global context/actions/component-actions'
import { removeComma } from '../../utils/formats'
import QuantityInput from '../quantity-input'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  amountInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      padding: 0,
      textAlign: 'center !important',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
  },
})

const AddCartItemDialog = ({
  open,
  handleClose,
  price,
  id,
  quantity,
  name,
  main_picture,
  suggested_price,
}) => {
  const classes = useStyles()
  const { cartDispatch: dispatch, componentDispatch } =
    useGlobaleDispatchContext()
  const [amount, setAmount] = useState(1)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      sellingPrice: removeComma(suggested_price) || undefined,
      amount: 1,
    },
    validate: (values) => {
      let errors = {}
      const { sellingPrice } = values
      if (sellingPrice <= removeComma(price)) {
        errors.sellingPrice = t(
          'cart.Selling Price must be higher than buying price',
        )
      }
      return errors
    },
    onSubmit: (values) => {
      const { sellingPrice } = values
      if (sellingPrice > removeComma(price) && amount <= quantity) {
        addItemToCart({
          id,
          name,
          amount,
          price: removeComma(price),
          main_picture,
          sellingPrice,
          quantity,
        })(dispatch)
        openStatusDrawer({
          open: true,
          message: t('cart.Product added to cart'),
          type: 'success',
        })(componentDispatch)
        handleClose()
      }
    },
  })

  const handleAmountChange = (value) => {
    setAmount(parseInt(value))
  }
  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 7 }}
      >
        {t('cart.Add product to cart')}
        <IconButton onClick={handleClose}>
          <CancelOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <InputField
          error={Boolean(
            formik.touched.sellingPrice && formik.errors.sellingPrice,
          )}
          helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
          type="number"
          label={t('Attributes.Selling price')}
          name="sellingPrice"
          onBlur={formik.handleBlur}
          value={formik.values.sellingPrice}
          onChange={formik.handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">DZD</InputAdornment>
            ),
          }}
        />
        <QuantityInput
          value={amount}
          label={t('Attributes.Quantity')}
          handleAmountChange={handleAmountChange}
          max={quantity}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: 'primary.contrast' }}
          onClick={formik.handleSubmit}
          disabled={
            amount > quantity ||
            amount < 0 ||
            price > formik.values.sellingPrice
          }
        >
          {t('cart.Add to cart')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCartItemDialog
