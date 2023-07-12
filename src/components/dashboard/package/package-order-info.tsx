import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../utils/formats'
import PackageInformationBox from './package-information-box'
import PackageOrderInfoDialog from './package-order-info-dialog'

type CompProps = {
  pack: any
}
const PackageOrderInfo = (props: CompProps) => {
  const { pack } = props
  const {
    tracking_code,
    name,
    quantity,
    price,
    extra_weight_price,
    delivery_price,
    price_to_pay,
  } = pack
  const amount_to_charge = delivery_price + extra_weight_price + price_to_pay
  const [openOrderInfoDialog, setOpenOrderInfoDialog] = useState(false)
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader
        title={t('packages.Package information')}
        action={
          <Button variant="text" onClick={() => setOpenOrderInfoDialog(true)}>
            {t('Edit')}
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        {tracking_code && (
          <PackageInformationBox
            label="Tracking code"
            value={`${tracking_code}`}
          />
        )}
        <PackageInformationBox label="Product Name" value={name} />
        <PackageInformationBox label="Quantity" value={quantity} />
        <Divider variant="inset" />
        <PackageInformationBox
          label="Price"
          sx={{ gridColumnStart: 1, gridColumnEnd: 3 }}
          value={`${dinarFormat(price)}`}
        />
        <PackageInformationBox
          label="Amount to Charge"
          value={dinarFormat(amount_to_charge)}
        />
        <PackageInformationBox
          label="Amount  to pay"
          value={dinarFormat(price_to_pay)}
          last
        />
      </CardContent>
      <PackageOrderInfoDialog
        open={openOrderInfoDialog}
        onClose={() => setOpenOrderInfoDialog(false)}
        pack={pack}
      />
    </Card>
  )
}

export default PackageOrderInfo
