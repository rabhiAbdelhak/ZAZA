import { Info } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const EmptyCart = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        my: 5,
      }}
    >
      <Info sx={{ color: 'info.main', fontSize: '40px' }} />
      <Typography variant="h3" color="text.primary">
        {t('cart.You do not add any product to your cart yet')}
      </Typography>
      <Typography>
        {t('cart.Search products using the form on top, or')}
      </Typography>
      <Button
        variant="contained"
        sx={{ color: 'primary.contrast' }}
        onClick={() => router.push('/dashboard/products/shop')}
      >
        {t('cart.Go To Shopping')}
      </Button>
    </Box>
  )
}

export default EmptyCart
