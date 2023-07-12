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
  const hasWilaya = Boolean(wilayaId)
  const hasCompany = Boolean(companyId)
  const hasDistination = Boolean(delivery_distinaton_id)
  return (
    <Box>
      {(hasWilaya || wilayaId !== undefined) && (
        <GetCompaniesInput wilayaId={wilayaId} companyId={companyId} onChangeValue={onChangeValue} />
      )}
      {(hasCompany && hasWilaya) && (
        <DeliveryDistinaton
          companyId={companyId}
          officeId={officeId}
          wilayaId={wilayaId}
          onChangeValue={onChangeValue}
          distination={delivery_distinaton_id}
        />
      )}
      {(hasDistination || delivery_distinaton_id !== undefined) && (
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
