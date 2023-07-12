import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

function DeliveryDistinaton({
  wilayaId,
  distination,
  onChangeValue,
  companyId,
  officeId,
}: any) {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="subtitle2" color="text.primary">
        {t('Attributes.Distination')}
      </Typography>
      <Box className="zimou-checks">
        <Box sx={{ width: '50%' }} className="zimou-checks-text">
          <input
            onChange={onChangeValue}
            type="radio"
            value={'2'}
            id={`delivery-distination-${2}`}
            name="delivery_distinaton_id"
          />
          <label htmlFor={`delivery-distination-${2}`}>
            {t('delivery.DirectDelivery')}
          </label>
        </Box>
        <Box sx={{ width: '50%' }} className="zimou-checks-text">
          <input
            onChange={onChangeValue}
            type="radio"
            value={'1'}
            id={`delivery-distination-${1}`}
            name="delivery_distinaton_id"
          />
          <label htmlFor={`delivery-distination-${1}`}>
            {t('delivery.RelayPoint')}
          </label>
        </Box>
      </Box>
    </>
  )
}

DeliveryDistinaton.propTypes = {
  wilayaId: PropTypes.any,
  distination: PropTypes.number,
  onChangeValue: PropTypes.func,
  companyId: PropTypes.any,
  officeId: PropTypes.any,
}

export default DeliveryDistinaton
