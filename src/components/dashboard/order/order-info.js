import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import OrderCheckoutInformationBox from './order-checkout-information-box'
import { dinarFormat } from '../../../utils/formats'
import { useState } from 'react'
import DeliveryInfoDialog from '../../delivery-info-dialog'
import OrderInfoUpdateDialog from './order-info-update-dialog'
import { useTranslation } from 'react-i18next'

const statusVariants = [
  {
    label: 'Placed',
    value: 'placed',
  },
  {
    label: 'Processed',
    value: 'processed',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
  {
    label: 'Complete',
    value: 'complete',
  },
]

const boxStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  justifyContent: 'space-between',
}
const cartContentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  justifyContent: 'space-between',
}

export const OrderInfo = ({ order, onUpdate, Editable }) => {
  const {
    can_be_opened,
    free_delivery,
    notes,
    source,
    order_id,
    delivery_price,
    delivery_type_name,
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
      <Card sx={{ mb: 4, height: '230px' }}>
        <CardHeader
          title={`2. ${t('orders.Order Information')}`}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          action={
            onUpdate && (
              <Button onClick={() => setOpenOrderInfoDialog(true)}>
                {t('Edit')}
              </Button>
            )
          }
        />
        <CardContent sx={cartContentStyle}>
          <Box sx={boxStyle}>
            <OrderCheckoutInformationBox
              label="Order Tracking"
              value={order_id}
            />
            <OrderCheckoutInformationBox
              label="Lead Source"
              value={source}
              name="source"
              onUpdate={onUpdate}
              Editable={Editable}
            />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardHeader
          title={`3. ${t('orders.Delivery information')}`}
          action={
            onUpdate && (
              <Button onClick={() => setOpendeliveryInfoDialog(true)}>
                {t('Edit')}
              </Button>
            )
          }
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent sx={cartContentStyle}>
          <Box sx={boxStyle}>
            <OrderCheckoutInformationBox
              label="Type"
              value={delivery_type_name}
            />
            <OrderCheckoutInformationBox
              label="Open Package"
              value={can_be_opened}
              name="can_be_opened"
              onUpdate={onUpdate}
              type="boolean"
              Editable={Editable}
            />
          </Box>
          <Box sx={boxStyle}>
            <OrderCheckoutInformationBox
              label="FreeDelivery"
              value={free_delivery}
              name="free_delivery"
              onUpdate={onUpdate}
              type="boolean"
              Editable={Editable}
            />
            <OrderCheckoutInformationBox
              label="Cost"
              value={dinarFormat(delivery_price)}
            />
          </Box>
          <Box sx={boxStyle}>
            <OrderCheckoutInformationBox label="State" value={wilaya} />
            <OrderCheckoutInformationBox label="Town" value={commune} />
          </Box>
          <Box sx={boxStyle}>
            <OrderCheckoutInformationBox
              label="Note"
              value={notes}
              name="notes"
              onUpdate={onUpdate}
              Editable={Editable}
            />
          </Box>
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

OrderInfo.propTypes = {
  onEdit: PropTypes.func,
  order: PropTypes.object.isRequired,
}
