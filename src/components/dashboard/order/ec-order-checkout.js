import { Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PackageCustmerInfo from '../package/package-customer-info'
import PackageDeliveryInfo from '../package/package-delivery-info'
import PackageOrderInfo from '../package/package-order-info'

const EcommerceOrderCheckout = ({ order, onValidate }) => {
  const { t } = useTranslation()
  return (
    <>
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid container item md={12} spacing={2}>
          <Grid item md={6}>
            <PackageCustmerInfo pack={order} />
          </Grid>
          <Grid container item md={6} spacing={2}>
            <Grid item md={12}>
              <PackageOrderInfo pack={order} />
            </Grid>
            <Grid item md={12}>
              <PackageDeliveryInfo pack={order} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ color: 'primary.contrast', mt: 2, float: 'right' }}
        onClick={onValidate}
      >
        {t('Validate')}
      </Button>
    </>
  )
}

export default EcommerceOrderCheckout
