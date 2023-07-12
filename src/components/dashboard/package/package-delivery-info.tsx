import { Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../utils/formats'
import PackageDeliveryInfoDialog from './package-delivery-info-dialog'
import PackageInformationBox from './package-information-box'

const cartContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  p: 0,
  justifyContent: 'space-between',
}

type CompProps = {
  pack: any
}
const PackageDeliveryInfo = (props: CompProps) => {
  const { pack } = props
  const {
    delivery_type,
    weight,
    delivery_price,
    extra_weight_price,
    can_be_opened,
    observation,
  } = pack
  const [openDeliveryInfoDialog, setOpenDeliveryDialog] = useState(false)
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        title={t('packages.Delivery information')}
        action={
          <Button variant="text" onClick={() => setOpenDeliveryDialog(true)}>
            {t('Edit')}
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={cartContentStyle}>
        <PackageInformationBox label="Type" value={`${delivery_type}`} />
        <PackageInformationBox
          label="Cost"
          value={dinarFormat(delivery_price)}
        />
        <PackageInformationBox
          label="Open Package"
          value={can_be_opened ? 'YES' : 'NO'}
        />
        <PackageInformationBox label="Weight" value={weight} />
        <PackageInformationBox
          label="Cost Extra Weight"
          value={dinarFormat(extra_weight_price)}
        />
        <PackageInformationBox label="Additional Notes" value={observation} />
      </CardContent>
      <PackageDeliveryInfoDialog
        open={openDeliveryInfoDialog}
        onClose={() => setOpenDeliveryDialog(false)}
        pack={pack}
      />
    </Card>
  )
}

export default PackageDeliveryInfo
