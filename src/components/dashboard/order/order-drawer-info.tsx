import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'

//local import
import { dinarFormat } from '../../../utils/formats'
import { useState } from 'react'
import DeliveryInfoDialog from '../../delivery-info-dialog'
import OrderInfoUpdateDialog from './order-info-update-dialog'
import OrderInformationBox from './order-information-box'
import { Order } from '@/types/order'

const cartContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  p: 0,
}

type CompProps = {
  order: Order
  onUpdate?: (values: any, helpers: any) => any
  Editable?: boolean
}

export const OrderDrawerInfo = (props: CompProps) => {
  const { order, onUpdate, Editable } = props
  const {
    can_be_opened,
    free_delivery,
    notes,
    source,
    order_id,
    delivery_price,
    delivery_type_name,
    delivery_company_name,
    wilaya,
    commune,
  } = order
  const [openDeliveryInfoDialog, setOpendeliveryInfoDialog] = useState(false)
  const [openOrderInfoDialog, setOpenOrderInfoDialog] = useState(false)
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        height: '100%',
      }}
    >
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title={`${t('orders.Order Information')}`}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'neutral.100',
          }}
        />
        <CardContent sx={cartContentStyle}>
          <OrderInformationBox
            key={order?.id + 'order_id'}
            label="Order Tracking"
            value={order_id}
          />
          <OrderInformationBox
            key={order?.id + 'source'}
            label="Lead Source"
            value={source}
            name="source"
            onUpdate={onUpdate}
            Editable={Editable}
            last
          />
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardHeader
          title={`${t('orders.Delivery information')}`}
          action={
            onUpdate && (
              <Button onClick={() => setOpendeliveryInfoDialog(true)}>
                {t('Edit')}
              </Button>
            )
          }
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'neutral.100',
          }}
        />
        <CardContent sx={cartContentStyle}>
          <OrderInformationBox label="Company Name" value={delivery_company_name} />
          <OrderInformationBox
            key={order?.id + 'can_be_opened'}
            label="Open Package"
            value={can_be_opened}
            name="can_be_opened"
            onUpdate={onUpdate}
            type="boolean"
            Editable={Editable}
          />
          <OrderInformationBox
            key={order?.id + 'free_delivery'}
            label="FreeDelivery"
            value={free_delivery}
            name="free_delivery"
            onUpdate={onUpdate}
            type="boolean"
            Editable={Editable}
          />
          <OrderInformationBox
            key={order?.id + '2'}
            label="Cost"
            value={String(dinarFormat(delivery_price))}
          />
          <OrderInformationBox label="State" value={wilaya} />
          <OrderInformationBox label="Town" value={commune} />
          <OrderInformationBox
            key={order?.id + 'notes'}
            label="Note"
            value={notes || ''}
            name="notes"
            onUpdate={onUpdate}
            Editable={Editable}
            last
          />
        </CardContent>
        <DeliveryInfoDialog
          open={openDeliveryInfoDialog}
          data={order}
          onSubmit={onUpdate}
          onClose={() => setOpendeliveryInfoDialog(false)}
        />
        {openOrderInfoDialog && (
          <OrderInfoUpdateDialog
            open={openOrderInfoDialog}
            onSubmit={onUpdate}
            onClose={() => setOpenOrderInfoDialog(false)}
            data={order}
          />
        )}
      </Card>
    </Box>
  )
}
