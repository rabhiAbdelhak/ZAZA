import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

//local imports
import OrderDrawerCustomerInfo from './order-drawer-customer-info'
import { OrderDrawerInfo } from './order-drawer-info'
import { OrderInfo } from './order-info'
import OrderProductsCard from './order-produts-card'

const OrderCheckout = ({
  setValidated,
  Editable,
  onCreate,
  validation,
  order,
  onUpdate,
  onStepperFinished,
}) => {
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl">
      <Grid container columns={11} spacing={2}>
        <Grid item md={6}>
          <OrderDrawerCustomerInfo
            order={order}
            onUpdate={onUpdate}
            Editable={Editable}
          />
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
          <OrderDrawerInfo order={order} Editable={false} />
        </Grid>
      </Grid>
      <OrderProductsCard order={order} Editable={Editable} />
      {validation && (
        <Button
          variant="contained"
          color="primary"
          sx={{ float: 'right', color: 'primary.contrast', mt: 2 }}
          onClick={() => {
            const orderToCreate = { ...order }
            delete orderToCreate.delivery_type_name
            const products = orderToCreate.products.map((product) => {
              const { product_id, quantity, selling_price } = product
              return { product_id, quantity, price: selling_price }
            })
            orderToCreate.products = products
            onCreate(orderToCreate)
            setValidated?.(true)
            onStepperFinished?.()
          }}
        >
          {t('orders.Validate Order')}
        </Button>
      )}
    </Container>
  )
}

export default OrderCheckout
