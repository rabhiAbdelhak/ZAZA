import React from 'react'
import PropTypes from 'prop-types'
import DeliveryPriceByCommune from './DeliveryPriceByCommune'
import GetDeliveryTypes from './DeliveryTypeas'
function DeliveryTypes({ officeId,
    wilayaId,
    distination,
    typeId,
    formik,
    onChangeValue,
    handeleDeliveryChange,
    companyId }: any) {
    const hasCompany = Boolean(companyId)
    const hasDistination = Boolean(distination)

    return (
        <>
            {hasDistination && hasCompany &&
                <div>
                    {distination == '1' && <DeliveryPriceByCommune
                        formik={formik}
                        wilayaId={wilayaId}
                        typeId={typeId}
                        handleChange={onChangeValue}
                        onChange={handeleDeliveryChange}
                        officeId={officeId}
                        companyId={companyId}
                    />
                    }
                    {distination == '2' && <GetDeliveryTypes
                        companyId={companyId}
                        onChangeValue={onChangeValue}
                        distination={distination}
                        typeId={typeId}
                        wilayaId={wilayaId}
                    />}
                </div>
            }
        </>
    )
}

DeliveryTypes.propTypes = {
    officeId: PropTypes.any,
    wilayaId: PropTypes.any,
    distination: PropTypes.any,
    formik: PropTypes.any,
    value: PropTypes.any,
    typeId: PropTypes.any,
    onChangeValue: PropTypes.func,
    companyId: PropTypes.any,
    handeleDeliveryChange: PropTypes.func,
    commune: PropTypes.any,
}

export default DeliveryTypes
