import { CheckCircleOutline } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'

const OrderSubmited = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          height: 'calc(100vh - 255px)',
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircleOutline
          color="success"
          size="large"
          sx={{ fontSize: '35px' }}
        />
        <Typography variant="h3" color="text.primary">
          {t('orders.Order submitted')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('orders.You will find your order in the orders management page')}
        </Typography>
        <NextLink href="/dashboard/orders">
          <Button style={{ color: 'primary' }}>
            {t('orders.Order Management')}
          </Button>
        </NextLink>
      </Container>
    </Box>
  )
}

export default OrderSubmited
