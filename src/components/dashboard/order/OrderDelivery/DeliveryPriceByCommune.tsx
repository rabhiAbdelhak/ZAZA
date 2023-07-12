import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { LocationCity } from '@mui/icons-material'
import { Typography, CircularProgress, Alert } from '@mui/material'
import {
    getDeliveryCompaniesOffices,
} from '../../../../queries/delivery'
import NoData from '@/components/no-data'
import ZimouRadio from '@/components/ZimouRadio'
import { Box } from '@mui/system'

function DeliveryPriceByCommune({ wilayaId, companyId, officeId, handleChange }: any) {
    const { t } = useTranslation()
    const { data: OfficesData, isLoading, error, refetch } = getDeliveryCompaniesOffices(wilayaId, companyId)
    const [defaulstring, setDefaulstring] = useState(false)
    const hasCompany = Boolean(companyId)
    return (
        <>
            {(hasCompany) && <>
                <Typography variant="subtitle2" color="text.primary">
                    {t('delivery.RelayPoint')}
                </Typography>
                {!OfficesData && isLoading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: 27 }}><CircularProgress /></div>}
                {!OfficesData && error && <Alert severity="error">{t('error_unexpected')} <a onClick={() => refetch()} style={{ fontWeight: 700, cursor: 'pointer' }}>{t('try_again')}</a></Alert>}
                {!error && !isLoading && OfficesData && OfficesData.length == 0 && <NoData />}
                <div
                    className="zimou-checks"
                    style={{ marginInline: -4, flexWrap: 'wrap' }}
                >
                    {!error && !isLoading && OfficesData && <>
                        {OfficesData?.map((item: any) => (
                            <ZimouRadio
                                key={item.id}
                                name="office_id"
                                value={item.id}
                                id={item.id}
                                checked={officeId == item.id}
                                width={'50%'}
                                onChangeValue={handleChange} >
                                <Typography className="title-price">{item.commune?.name}, {item.commune?.wilaya?.name}</Typography>
                                <Typography className="meta-loc">
                                    {item.delivery_price} DZD
                                </Typography>
                                {item.address &&
                                    <>
                                        {!defaulstring ? <Typography onClick={() => setDefaulstring(true)} className="meta-text">{item.address.slice(0, 70)}...</Typography> :
                                            <Typography onClick={() => setDefaulstring(false)} className="meta-text">{item.address}</Typography>}
                                    </>
                                }
                            </ZimouRadio>
                        ))}
                    </>}
                </div>
            </>}
        </>
    )
}

DeliveryPriceByCommune.propTypes = {
    wilayaId: PropTypes.any,
    typeId: PropTypes.any,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    companyId: PropTypes.any,
    formik: PropTypes.any,
    officeId: PropTypes.any,
}

export default DeliveryPriceByCommune
