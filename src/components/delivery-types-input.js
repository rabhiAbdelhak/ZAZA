import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../utils/formats'

const DeliveryTypesInput = (props) => {
  const { deliveryTypes, value, onChange } = props
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="subtitle2" color="text.primary" mb={1}>
        {t('Attributes.DeliveryType')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '5px',
          p: 2,
        }}
      >
        {deliveryTypes.length ? (
          deliveryTypes.map((type) => {
            const { id, name, price } = type
            return (
              <Box
                key={type.id}
                sx={{
                  minWidth: '32%',
                  border: '2px solid',
                  borderColor: id === value ? 'primary.main' : 'divider',
                  display: 'flex',
                  gap: 1,
                  p: 1,
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => onChange(id)}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" color="text.secondary">
                    {t(name)}
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    {dinarFormat(price)}
                  </Typography>
                </Box>
              </Box>
            )
          })
        ) : (
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Typography
              sx={{ textAlign: 'center' }}
              variant="caption"
              color="info.main"
            >
              {t(
                'Deliveries types and costs will be calculated after selecting your town',
              )}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  )
}

export default DeliveryTypesInput
