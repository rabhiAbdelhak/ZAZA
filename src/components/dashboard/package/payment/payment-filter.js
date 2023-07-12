import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Query } from '../../../query'
import PaymentsBulkActions from './paymnts-bulk-actions'

const PaymentFilters = (props) => {
  const { selectedPayments, isLoading, error, query, onQueryChange } = props
  const { t } = useTranslation()

  const disabled = isLoading || error
  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            sm: 'auto 1fr auto',
            xs: 'auto',
          },
          justifyItems: 'flex-start',
          p: 3,
        }}
      >
        <PaymentsBulkActions
          selectedPayments={selectedPayments}
          disabled={disabled}
        />
        <Query
          disabled={isLoading}
          onChange={onQueryChange}
          placeholder={t('SearchInput')}
          sx={{
            order: {
              sm: 2,
              xs: 1,
            },
          }}
          value={query}
        />
      </Box>
    </div>
  )
}

export default PaymentFilters
