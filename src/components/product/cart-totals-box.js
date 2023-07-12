import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useGlobaleStateContext } from '../../contexts/global context/Provider'
import { dinarFormat } from '../../utils/formats'

const CartTotalsBox = () => {
  const {
    cartState: { totalPrice },
  } = useGlobaleStateContext()
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', float: 'right' }}>
      <Typography variant="overline" color="text.secondary">
        {t('cart.Total PRICE you will pay')}:
      </Typography>
      <Typography variant="h4" color="text.primary">
        {dinarFormat(totalPrice)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/dashboard/orders/new-order')}
        sx={{ float: 'right', color: 'primary.contrast', mt: 2 }}
      >
        {t('cart.Lunch Order')}
      </Button>
    </Box>
  )
}

export default CartTotalsBox
