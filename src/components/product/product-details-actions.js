import { ShoppingCart } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobaleStateContext } from '../../contexts/global context/Provider'
import { dinarFormat } from '../../utils/formats'
import AddCartItemDialog from './add-cart-item-dialog'

const ProductDetailsActions = ({ product }) => {
  const [openAddToCartDialog, setOpenAddToCartDialog] = useState(false)
  const {
    cartState: { cartItems },
  } = useGlobaleStateContext()
  const { t } = useTranslation()
  const existedOnCart = cartItems.find((item) => item.id === product.id)
  const handleCloseAddToCartDialog = () => {
    setOpenAddToCartDialog(false)
  }

  const handleOpenAddToCartDialog = () => {
    setOpenAddToCartDialog(true)
  }

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'grey.50',
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            variant="subtitle3"
            sx={{ textTransform: 'uppercase' }}
          >
            {t('Attributes.Suggested price')}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {dinarFormat(product.suggested_price)}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ textTransform: 'uppercase' }}
          >
            {t('We suggest this price for you')}
          </Typography>
          {!existedOnCart ? (
            <Button
              variant="contained"
              sx={{ color: 'primary.contrast', mt: '15px' }}
              startIcon={<ShoppingCart />}
              onClick={handleOpenAddToCartDialog}
              disabled={product.quantity === 0}
            >
              {t('cart.Add to cart')}
            </Button>
          ) : (
            <Typography variant="caption" color="primary">
              Already added to cart
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{ textTransform: 'uppercase' }}
          color="text.primary"
        >
          {t('What is this')} ?
        </Typography>
      </Box>
      <AddCartItemDialog
        open={openAddToCartDialog}
        handleClose={handleCloseAddToCartDialog}
        {...product}
      />
    </>
  )
}

export default ProductDetailsActions
