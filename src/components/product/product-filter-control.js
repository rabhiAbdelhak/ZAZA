import { Settings } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { InputField } from '../input-field'
import CurrentFilters from './current-filters'
import { debounce } from './debounce'

const ProductFilterControl = ({
  toggleOpenFilter,
  isFilterOpen,
  submitFiltersForm,
  filter,
  onChangeFilter,
}) => {
  const [name, setName] = useState(filter.name)
  const { t } = useTranslation()

  const setFilterByName = (e) => {
    setName(e.target.value)
    debounce(() => onChangeFilter({ ...filter, name: e.target.value }), 2000)()
  }
  return (
    <Box
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '64px auto',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          color={isFilterOpen ? 'primary' : 'secondary'}
          sx={{ color: 'primary.contrast' }}
          startIcon={<Settings />}
          onClick={() => {
            if (isFilterOpen) {
              submitFiltersForm()
            }
            toggleOpenFilter()
          }}
        >
          {t('Filters.Refined Results')}
        </Button>
        <CurrentFilters filter={filter} />
      </Box>
      <Box>
        <InputField
          type="text"
          placeholder={t('products.Search by product name.')}
          name="name"
          value={name}
          onChange={setFilterByName}
          sx={{ width: '400px' }}
        />
      </Box>
    </Box>
  )
}

export default ProductFilterControl
