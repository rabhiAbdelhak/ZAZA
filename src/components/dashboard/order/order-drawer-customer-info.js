import { Card, CardContent, CardHeader } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import OrderInformationBox from './order-information-box'
import CustomerInfoFormDilaog from './order-customer-info-dialog'

const cartContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 0,
}

const OrderDrawerCustomerInfo = ({ order, onUpdate, Editable }) => {
  const {
    client_first_name,
    client_last_name,
    client_address,
    client_phone,
    client_phone2,
  } = order
  const [isCustomerInfoDialogOpen, setIsCustomerInfoDialogOpen] =
    useState(false)
  const { t } = useTranslation()

  return (
    <Card sx={{ height: onUpdate ? '100%' : '100%' }}>
      <CardHeader
        title={`${t('orders.Customer information')}`}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'neutral.100',
        }}
      />
      <CardContent sx={cartContentStyle}>
        <OrderInformationBox
          key={order?.id + 'client_first_name'}
          label="First Name"
          name="client_first_name"
          value={`${client_first_name}`}
          onUpdate={onUpdate}
          Editable={Editable}
        />
        <OrderInformationBox
          key={order?.id + 'client_last_name'}
          label="Last Name"
          name="client_last_name"
          value={`${client_last_name}`}
          onUpdate={onUpdate}
          Editable={Editable}
        />
        <OrderInformationBox
          key={order?.id + 'client_phone'}
          label="Phone Number #1"
          value={client_phone}
          name="client_phone"
          onUpdate={onUpdate}
          Editable={Editable}
          call
        />
        <OrderInformationBox
          key={order?.id + 'client_phone2'}
          label="Phone Number #2"
          value={client_phone2}
          name="client_phone2"
          onUpdate={onUpdate}
          Editable={Editable}
          call
        />
        <OrderInformationBox
          key={order?.id + 'client_address'}
          label="Address"
          value={client_address}
          name="client_address"
          onUpdate={onUpdate}
          Editable={Editable}
          last
        />
      </CardContent>
      {isCustomerInfoDialogOpen && (
        <CustomerInfoFormDilaog
          open={isCustomerInfoDialogOpen}
          onClose={() => setIsCustomerInfoDialogOpen(false)}
          order={order}
          onSubmit={onUpdate}
        />
      )}
    </Card>
  )
}

export default OrderDrawerCustomerInfo
