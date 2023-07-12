import { Notifications, ShoppingCart } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

//local imports
import { useGlobaleStateContext } from '../../contexts/global context/Provider'
import { useUpdateProductSubscriptionMutation } from '../../queries/product'
import { dinarFormat, removeComma } from '../../utils/formats'
import AddCartItemDialog from './add-cart-item-dialog'
import DiscountTypography from './DiscountTypography'

const ProductCard = ({ product }) => {
  const { id, image: main_picture } = product
  const [openAddToCartDialog, setOpenAddToCartDialog] = useState(false)
  const {
    cartState: { cartItems },
  } = useGlobaleStateContext()
  const router = useRouter()
  const { t } = useTranslation()
  const handleCloseAddToCartDialog = () => {
    setOpenAddToCartDialog(false)
  }

  const handleOpenAddToCartDialog = () => {
    setOpenAddToCartDialog(true)
  }
  const mutation = useUpdateProductSubscriptionMutation()

  const toggleSubscribe = (id, isSubscribe) => {
    const result = toast.promise(mutation.mutateAsync({ id, isSubscribe }), {
      loading: t('toast.Saving'),
      success: () => {
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        return err?.response?.data?.message
      },
    })
    return result
  }
  const notificationIconColor = product?.is_subscribe
    ? 'error.main'
    : 'text.primary'
  const existInCart = Boolean(cartItems.find((item) => item.id === id))
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        border: '1px solid',
        p: 1,
        px: 0,
        maxheight: '320px',
        maxWidth: '175px',
        borderColor: 'transparent',
        borderRadius: '16px',
        transition: '200ms',
        position: 'relative',
        '&:hover': {
          borderColor: 'divider',
          px: 1,
          transform: 'scale(1.1, 1.07)',
          boxShadow: '0px 22px 32px rgba(9, 30, 66, 0.08)',
          '& .supp-inf': { height: '70px' },
          '& .image': { height: '200px' },
          '& .subscription-badge': { width: '120px' },
          '& .id-container': { height: '15px' },
          '& .notification-icon': { color: notificationIconColor },
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: '15px', left: '15px', zIndex: 3 }}>
        {product?.discount > 0 && (
          <DiscountTypography discount={product?.discount} />
        )}
        <Box
          bgcolor="primary.contrast"
          sx={{
            color: product?.is_subscribe ? 'error.main' : 'text.primary',
            mt: 1,
            height: '25px',
            padding: '5px 4.2px',
            fontSize: '12px',
            borderRadius: '10px',
            width: '25px',
            overflow: 'hidden',
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            justifycontent: 'center',
            transition: '250ms',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { transform: 'scale(1.05' },
          }}
          className="subscription-badge"
          onClick={() => toggleSubscribe(id, product?.is_subscribe)}
        >
          <Notifications
            className="notification-icon"
            sx={{
              transition: '250ms',
              fontSize: '15px',
              color: product?.is_subscribe ? 'success.main' : 'text.primary',
            }}
          />
          <Typography variant="caption">
            {product?.is_subscribe ? t('Unsubscribe') : t('Subscribe')}
          </Typography>
        </Box>
      </Box>
      <Image
        className="image"
        src={main_picture || '/static/shoes2.webp'}
        alt={product.name}
        width={150}
        height={150}
        style={{ borderRadius: '15px', transition: '250ms' }}
        onClick={() => router.push('/dashboard/products/shop/' + product.id)}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <Typography
          variant="body2"
          noWrap
          sx={{ fontSize: '14px', p: 0, m: 0 }}
        >
          {product.name}
        </Typography>
        {product?.promotion && (
          <Typography
            color="text.secondary"
            variant="caption"
            sx={{ textDecoration: 'line-through' }}
          >
            {product.promotion} {product.currency}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '13px' }}>
          {removeComma(product.price) > 0 ? dinarFormat(product.price) : 'Free'}
        </Typography>
      </Box>
      <Box sx={{ height: '70px' }}>
        <Box
          sx={{ transition: 'height 250ms', height: 0, overflow: 'hidden' }}
          className="supp-inf"
        >
          <Typography color="text.secondary" variant="caption">
            {product.quantity} items
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            sx={{ mt: 1 }}
            size="small"
            onClick={(e) => {
              handleOpenAddToCartDialog()
              e.stopPropagation()
            }}
            disabled={product.quantity === 0 || existInCart}
          >
            {t('cart.Add to cart')}
          </Button>
        </Box>
      </Box>
      <AddCartItemDialog
        open={openAddToCartDialog}
        handleClose={handleCloseAddToCartDialog}
        {...product}
        main_picture={product.image}
      />
    </Box>
  )
}

export default ProductCard
