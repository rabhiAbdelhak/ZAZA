import { Add, Delete, Remove } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

//local imports
import {
  removeItemFromCart,
  setItemAmount,
} from '../../contexts/global context/actions/cart-actions'
import { setAlertDialogStatus } from '../../contexts/global context/actions/component-actions'
import { useGlobaleDispatchContext } from '../../contexts/global context/Provider'
import { dinarFormat } from '../../utils/formats'

const CartItem = ({
  id,
  name,
  main_picture,
  price,
  sellingPrice,
  amount,
  quantity,
}) => {
  const { cartDispatch: dispatch, componentDispatch } =
    useGlobaleDispatchContext()
  const { t } = useTranslation()
  const removeItem = () => {
    setAlertDialogStatus({
      message: t(
        "cart.Are you sure you want to delete this product? This can't be undone.",
      ),
      title: t('cart.Delete product from cart'),
      open: true,
      buttonText: t('Delete'),
      onConfirm: () => removeItemFromCart(id)(dispatch),
    })(componentDispatch)
  }
  return (
    <Box
      width="100%"
      bgcolor="grey.50"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Image
          width={120}
          height={120}
          src={main_picture}
          alt="item-image"
          style={{ borderRadius: '16px' }}
        />
        <Box>
          <Typography
            variant="overline"
            color="secondary"
            sx={{ textTrasform: 'uppercase' }}
          >
            {t('Attributes.Product ID')}: {id}
          </Typography>
          <Typography variant="h5" color="text.primary" mb={2}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: 'fit-content',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <IconButton
                sx={{ minHeight: 0, minWidth: 0, p: 1 }}
                onClick={() => setItemAmount(id, amount - 1)(dispatch)}
              >
                <Remove sx={{ fontSize: '18px' }} />
              </IconButton>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="body2" color="text.primary">
                {amount}
              </Typography>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                bgcolor="divider"
              />
              <IconButton
                sx={{ minHeight: 0, minWidth: 0, p: 1 }}
                onClick={() => setItemAmount(id, amount + 1)(dispatch)}
              >
                <Add sx={{ fontSize: '18px' }} />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              bgcolor="error"
              color="error"
              sx={{ minWidth: 0, px: 1 }}
              onClick={removeItem}
            >
              <Delete />
            </Button>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" mt={2}>
            {quantity} {t('cart.items available')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="overline" color="text.secondary">
          {t('Attributes.Selling price')}: {dinarFormat(sellingPrice)}
        </Typography>
        <Typography variant="h4" color="text.primary">
          {dinarFormat(price * amount)}
        </Typography>
      </Box>
    </Box>
  )
}

export default CartItem
