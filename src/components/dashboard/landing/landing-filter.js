import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Query } from '../../query'

const Landingfilter = (props) => {
  const { isLoading, onQueryChange, query } = props
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        px: {
          sm: 3,
        },
        py: 2,
      }}
    >
      <Query
        disabled={isLoading}
        onChange={onQueryChange}
        sx={{
          order: {
            sm: 2,
            xs: 1,
          },
        }}
        placeholder={t('SearchInput')}
        value={query}
      />
    </Box>
  )
}

export default Landingfilter
