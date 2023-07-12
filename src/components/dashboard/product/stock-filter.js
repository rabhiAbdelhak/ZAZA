import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Query } from '../../query'
import { useTranslation } from 'react-i18next'

function StocksFilter(props) {
  const { disabled, onQueryChange, query } = props
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        justifyItems: 'flex-start',
        p: 3,
      }}
    >
      <Query
        disabled={disabled}
        placeholder={t('stocks.SearchByName')}
        onChange={onQueryChange}
        sx={{ order: { sm: 2, xs: 1 } }}
        value={query}
      />
    </Box>
  )
}

StocksFilter.propTypes = {
  disabled: PropTypes.bool,
  onQueryChange: PropTypes.func,
  query: PropTypes.string,
}

export default StocksFilter
