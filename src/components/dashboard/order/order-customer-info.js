import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useHelpers from '../../../hooks/use-helpers'
import OrderCheckoutInformationBox from './order-checkout-information-box'
import CustomerInfoFormDilaog from './order-customer-info-dialog'

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

const OrderCustomerInfo = ({ order, onUpdate, Editable }) => {
  const {
    client_first_name,
    client_last_name,
    client_address,
    client_phone,
    client_phone2,
    wilaya,
    commune,
    wilaya_id,
    commune_id,
  } = order
  const [isCustomerInfoDialogOpen, setIsCustomerInfoDialogOpen] =
    useState(false)
  const { t } = useTranslation()

  return (
    <Card sx={{ height: onUpdate ? '100%' : '100%' }}>
      <CardHeader
        title={`1. ${t('orders.Customer information')}`}
        action={
          onUpdate && (
            <Button onClick={() => setIsCustomerInfoDialogOpen(true)}>
              {t('Edit')}
            </Button>
          )
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={cartContentStyle}>
        <Box sx={boxStyle}>
          <OrderCheckoutInformationBox
            label="First Name"
            name="client_first_name"
            value={`${client_first_name}`}
            onUpdate={onUpdate}
            Editable={Editable}
          />
          <OrderCheckoutInformationBox
            label="Last Name"
            name="client_last_name"
            value={`${client_last_name}`}
            onUpdate={onUpdate}
            Editable={Editable}
          />
        </Box>
        <Box sx={boxStyle}>
          <OrderCheckoutInformationBox
            label="Phone Number #1"
            value={client_phone}
            name="client_phone"
            onUpdate={onUpdate}
            Editable={Editable}
            call
          />
          <OrderCheckoutInformationBox
            label="Phone Number #2"
            value={client_phone2}
            name="client_phone2"
            onUpdate={onUpdate}
            Editable={Editable}
            call
          />
        </Box>
        <Box sx={boxStyle}>
          <OrderCheckoutInformationBox
            label="Address"
            value={client_address}
            name="client_address"
            onUpdate={onUpdate}
            Editable={Editable}
          />
        </Box>
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

export default OrderCustomerInfo
