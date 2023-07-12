import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import OrderDetailsStatusForm from './order-details-status-form'
import OrderStatusForm from './order-status-form'

const OrderDetailsStatusInfo = ({ order }) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ minHeight: '180px' }}>
      <CardHeader
        title={t('orders.Order Status')}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={{ p: 2 }}>
        <OrderDetailsStatusForm order={order} />
      </CardContent>
    </Card>
  )
}

export default OrderDetailsStatusInfo
