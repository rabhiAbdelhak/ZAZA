import { AllInclusive, CancelRounded } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../contexts/global context/Provider'

const FilterBox = ({ children, remove }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        bgcolor: 'neutral.100',
        border: '1px solid',
        borderColor: 'neutral.200',
        padding: '1px 5px',
        color: 'text.primary',
        borderRadius: '6px',
        height: 32,
        fontSize: '10px',
        maxWidth: '200px',
      }}
    >
      <Typography variant="caption" noWrap title={children}>
        {children}
      </Typography>
      <IconButton
        sx={{ color: 'neutral.300', p: 0, minHeight: 0, minWidth: 0 }}
        onClick={remove}
      >
        <CancelRounded />
      </IconButton>
    </Box>
  )
}

const CurrentFilters = ({ filter }) => {
  const { name, category, min_price, max_price, min_quantity, max_quantity } =
    filter

  let categoryFilters = null
  if (category.length > 0) {
    categoryFilters = (
      <FilterBox remove={() => null}>
        {category.map((c) => c.name).join(',')}
      </FilterBox>
    )
  }

  const intervalFilters = (min, max, name, rmF) => {
    if (min === 0 && (max === Infinity || max === undefined)) return
    const minAttr = name === 'Qty' ? 'min_quantity' : 'min_price'
    const maxAttr = name === 'Qty' ? 'max_quantity' : 'max_price'
    return (
      <FilterBox
        remove={() => {
          return null
        }}
      >
        {name} : {min} -{' '}
        {max === Infinity ? (
          <AllInclusive sx={{ color: 'text.primary', fontSize: '14px' }} />
        ) : (
          max
        )}
      </FilterBox>
    )
  }

  const simpleFilter = (name, value) => {
    if (!name || !value) return
    return (
      <FilterBox remove={() => null}>
        {name} : {value}
      </FilterBox>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {categoryFilters}
      {intervalFilters(min_price, max_price, 'Price Range', null)}{' '}
      {intervalFilters(min_quantity, max_quantity, 'Qty', null)}
    </Box>
  )
}

export default CurrentFilters
