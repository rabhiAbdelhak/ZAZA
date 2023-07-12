import { Card, CardHeader, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import OrderInformationBox from '@/components/dashboard/order/order-information-box'

type CompProps = {
  partnerCompany: PartnerCompany
  onUpdate?: (data: Partial<PartnerCompany>, helpers: any) => void
  Editable: boolean
}

const cartContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 0,
}

const PartnerCompanyInfoCard = (props: CompProps) => {
  const { partnerCompany, onUpdate, Editable } = props
  const { t } = useTranslation()

  return (
    <Card sx={{ height: onUpdate ? '100%' : '100%' }}>
      <CardHeader
        title={`${t('Delivery Company information')}`}
        sx={{
          bpartnerCompanyBottom: '1px solid',
          bpartnerCompanyColor: 'divider',
          bgcolor: 'neutral.100',
        }}
      />
      <CardContent sx={cartContentStyle}>
        <OrderInformationBox
          key={partnerCompany?.id + 'name'}
          label="Name"
          name="name"
          value={`${partnerCompany?.name}`}
          onUpdate={onUpdate}
          Editable={Editable}
        />
        <OrderInformationBox
          key={partnerCompany?.id + 'phone'}
          label="Phone Number"
          value={`${partnerCompany?.phone}`}
          name="phone"
          onUpdate={onUpdate}
          Editable={Editable}
          call
        />
      </CardContent>
    </Card>
  )
}

export default PartnerCompanyInfoCard
