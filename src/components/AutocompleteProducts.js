import { useProductsQuery } from '@/queries/product'
import { useState } from 'react'
import { AutocompleteField } from '@/components/autocomplete-field'
import { Avatar, Box, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { dinarFormat } from '@/utils/formats'
import { getInitials } from './CustomAvatar'
const defaultFilter = { 'filter[query]': '' }
const staleTime = 3 * 1000 * 60 // 3 minute
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

AutocompleteProducts.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

function AutocompleteProducts({ value = [], onChange, disabled = false }) {
  const [filter, setFilter] = useState(defaultFilter)
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useProductsQuery({
    filter,
    options: { enabled: open, staleTime },
  })
  const { t } = useTranslation()

  const selectedHandler = (event, items = []) => {
    onChange && onChange(items)
  }

  const onInputChange = (event, newSearch = '') => {
    setFilter((prev) => ({ ...prev, 'filter[query]': newSearch }))
  }

  const renderProductAvatar = (product) => {
    const img = product?.images[0]
    return (
      <Box sx={{ flexGrow: 1 }} display="flex" gap={2} alignItems="center">
        <Avatar variant="rounded">
          {!!img && (
            <Image
              width={40}
              height={40}
              objectFit="contain"
              src={img}
              alt={product.name}
            />
          )}
          {!img && getInitials(product.name)}
        </Avatar>
        <Box>
          <Typography noWrap variant="body2">
            {product.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            {dinarFormat(product.price)}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <AutocompleteField
      multiple
      value={value}
      disabled={disabled}
      onChange={selectedHandler}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={filter['filter[query]']}
      onInputChange={onInputChange}
      options={data?.data || []}
      loading={isLoading}
      placeholder={t('landing.Search')}
      getOptionLabel={() => ''}
      renderTags={() => null}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.id}>
          {renderProductAvatar(option)}
        </MenuItem>
      )}
    />
  )
}

export default AutocompleteProducts
