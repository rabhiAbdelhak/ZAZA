import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import OrderCheckoutInformationBox from './order-checkout-information-box'
import OrderProductsCard from './order-produts-card'

const boxStyle = { display: 'flex', flexDirection: 'column', gap: 2 }
const cartContentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  justifyContent: 'space-between',
}

const OrderCreateLoading = () => {
  return (
    <>
      <Grid container columns={11} sx={{ justifyContent: 'space-between' }}>
        <Grid item md={5}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="1. Customer information"
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <CardContent sx={cartContentStyle}>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Customer Name"
                  value="-"
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="Phone Number #1"
                  value={'-'}
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="Phone Number #2"
                  value={'-'}
                  loading={true}
                />
              </Box>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Address"
                  value={'-'}
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="wilaya"
                  value={'-'}
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="Commune"
                  value={'-'}
                  loading={true}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
          }}
        >
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title="2. Customer info"
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <CardContent sx={cartContentStyle}>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Order Number"
                  value={'-'}
                  loading={true}
                />
              </Box>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Lead Source"
                  value={'-'}
                  loading={true}
                />
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title="3. Delivery Info"
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <CardContent sx={cartContentStyle}>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Type"
                  value={'-'}
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="Open Package"
                  value={'-'}
                  loading={true}
                />
              </Box>
              <Box sx={boxStyle}>
                <OrderCheckoutInformationBox
                  label="Cost"
                  value={'-'}
                  loading={true}
                />
                <OrderCheckoutInformationBox
                  label="Note"
                  value={'-'}
                  loading={true}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <OrderProductsCard loading={true} />
    </>
  )
}

export default OrderCreateLoading
