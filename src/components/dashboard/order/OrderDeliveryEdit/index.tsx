import GetCompaniesInput from './GetCompaniesInput'
import DeliveryDistinaton from './DeliveryDistinaton'
import DeliveryTypes from './DeliveryTypes'
import { Box } from '@mui/material'

function index({
  typeId,
  officeId,
  wilayaId,
  handeleDeliveryChange,
  delivery_distinaton_id,
  companyId,
  onChangeValue,
  street,
}: any) {
  const hasCompany = Boolean(companyId)
  const hasDistination = Boolean(delivery_distinaton_id)
  return (
    <Box sx={{ paddingInline: 7 }}>

      {(hasCompany || companyId !== undefined) && (
        <DeliveryDistinaton
          companyId={companyId}
          officeId={officeId}
          wilayaId={wilayaId}
          onChangeValue={onChangeValue}
          distination={delivery_distinaton_id}
        />
      )}
      {(hasDistination) && (
        <DeliveryTypes
          handeleDeliveryChange={handeleDeliveryChange}
          typeId={typeId}
          wilayaId={wilayaId}
          officeId={officeId}
          onChangeValue={onChangeValue}
          distination={delivery_distinaton_id}
          companyId={companyId}
          value={street}
        />
      )}
    </Box>
  )
}

index.propTypes = {}

export default index
