import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Query } from '../../query'
import { useTranslation } from 'react-i18next'
import QueryChipFilter from '../../QueryChipFilter'

export const ProductsFilter = (props) => {
  const { disabled, filter, onFilter } = props
  const { t } = useTranslation()

  const handleFilter = (objectFilter) => {
    if (onFilter) {
      onFilter({ ...filter, ...objectFilter })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
      }}
    >
      <Query
        disabled={disabled}
        placeholder={t('products.Search')}
        onChange={(search) => handleFilter({ 'filter[query]': search })}
        value={filter?.['filter[query]']}
      />

      {Boolean(filter?.['filter[query]']) && (
        <Box>
          <QueryChipFilter
            label={filter?.['filter[query]']}
            onDelete={() => handleFilter({ 'filter[query]': '' })}
          />
        </Box>
      )}
    </Box>
  )
}

ProductsFilter.propTypes = {
  filter: PropTypes.object,
  onFilter: PropTypes.func,
}
