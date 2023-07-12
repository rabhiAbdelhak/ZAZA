import { Add, Remove } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useUpdateProductSubscriptionMutation } from '../../queries/product'
import { dinarFormat } from '../../utils/formats'

//local imports
import DiscountTypography from './DiscountTypography'
import ProductDetailsActions from './product-details-actions'

const ProductDetailsInformation = ({ product }) => {
  const { t } = useTranslation()
  const [subscribeLoading, setSubscribeLoading] = useState(false)

  const mutation = useUpdateProductSubscriptionMutation()

  const toggleSubscribe = (id, isSubscribe) => {
    setSubscribeLoading(true)
    const result = toast.promise(mutation.mutateAsync({ id, isSubscribe }), {
      success: () => {
        setSubscribeLoading(false)
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        setSubscribeLoading(false)
        return err?.response?.data?.message
      },
    })
    return result
  }
  const {
    id,
    description,
    category,
    quantity,
    name,
    price,
    promotion,
    discount,
    is_subscribe,
    main_picture,
  } = product

  return (
    <Grid container sx={{ gap: 3, justifyContent: 'space-between' }}>
      <Grid item md={6} sm={12}>
        <img
          src={main_picture}
          alt={name}
          style={{ width: '100%', height: '560px', borderRadius: '10px' }}
        />
      </Grid>
      <Grid item md={5.5} sm={12}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="overline" color="text.primary">
              {t('Attributes.Product ID')}: {id}
            </Typography>
            <Typography variant="overline" color="primary">
              {category?.name}
            </Typography>
          </Box>
          {is_subscribe ? (
            <Button
              size="small"
              disabled={subscribeLoading}
              variant="outlined"
              color="primary"
              startIcon={<Remove />}
              onClick={() => toggleSubscribe(product.id, true)}
            >
              {subscribeLoading ? t('Saving') + '...' : t('Unsubscribe')}
            </Button>
          ) : (
            <Button
              size="small"
              disabled={subscribeLoading}
              variant="outlined"
              color="success"
              startIcon={<Add />}
              onClick={() => toggleSubscribe(product.id, false)}
            >
              {subscribeLoading ? t('Saving') + '...' : t('Subscribe')}
            </Button>
          )}
        </Box>
        <Typography color="text.primary" variant="h2" noWrap>
          {name}
        </Typography>
        <Typography color="text.primary" variant="body1">
          {description}
        </Typography>
        <Box my={5}>
          {discount && promotion && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DiscountTypography discount={discount} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {promotion} {currency}
              </Typography>
            </Box>
          )}
          <Typography variant="h3">{dinarFormat(price)}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {quantity} {t('cart.items available')}
          </Typography>
        </Box>
        <ProductDetailsActions product={product} />
      </Grid>
    </Grid>
  )
}

export default ProductDetailsInformation
