import React from 'react'
import PropTypes from 'prop-types'
import { Typography, CircularProgress, Alert, Box, FormLabel } from '@mui/material'
import {
    useGetDeliveryTypeByDeliveryCompany,
} from '../../../../queries/delivery'
import NoData from '@/components/no-data'
import { useTranslation } from 'react-i18next'
import ZimouRadio from '@/components/ZimouRadio'

function GetDeliveryTypes({
    wilayaId,
    distination,
    typeId,
    onChangeValue,
    commune,
    companyId }: any) {
    const { t } = useTranslation()
    const { data, isLoading, error, refetch } = useGetDeliveryTypeByDeliveryCompany(wilayaId, companyId)
    return (
        <>
            <Typography variant="subtitle2" color="text.primary">
                {t('Attributes.Delivery Type')}
            </Typography>
            {error && <Alert severity="error">{t('error_unexpected')} <a onClick={() => refetch()} style={{ fontWeight: 700, cursor: 'pointer' }}>{t('try_again')}</a></Alert>}
            {/* Display Spinner Loading if featching data */}
            {isLoading && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: 27 }}><CircularProgress /></div>}
            {/* Display No Data if not data */}
            {data && data.length == 0 && <NoData />}
            {/* Feitch data */}

            <Box className='zimou-checks' sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {!error && data && data.map((item: any) => (
                    <ZimouRadio
                        key={item.id}
                        width={'25%'}
                        checked={typeId == item.id}
                        onChangeValue={onChangeValue}
                        value={item.id}
                        id={item.id}
                        name='delivery_type_id'>
                        <Typography className="title-price">{item.delivery_type_name}</Typography>
                        <Typography className="meta-loc">
                            {item.price} DZD
                        </Typography>
                    </ZimouRadio>
                ))}
            </Box>
        </>
    )
}

GetDeliveryTypes.propTypes = {
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

export default GetDeliveryTypes
