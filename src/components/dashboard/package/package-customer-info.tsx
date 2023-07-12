import { Card, CardContent, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'

//local imports
import PackageInformationBox from './package-information-box'
const cartContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 0,
}

type CompProps = {
  pack: any
}

const PackageCustmerInfo = (props: CompProps) => {
  const { pack } = props
  const { client_first_name, address, client_phone, client_phone2, commune } =
    pack
  const { t } = useTranslation()

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={t('packages.Customer information')}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={cartContentStyle}>
        <PackageInformationBox
          label="Customer Name"
          value={`${client_first_name}`}
        />
        <PackageInformationBox label="Phone Number #1" value={client_phone} />
        <PackageInformationBox label="Phone Number #2" value={client_phone2} />
        <PackageInformationBox label="Address" value={address} />
        <PackageInformationBox label="State" value={commune?.wilaya?.name} />
        <PackageInformationBox label="Town" value={commune?.name} />
      </CardContent>
    </Card>
  )
}

export default PackageCustmerInfo
