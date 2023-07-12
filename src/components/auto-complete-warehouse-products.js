import { useProductsQuery, useSearchProductsQuery } from '@/queries/product'
import { useState } from 'react'
import { AutocompleteField } from '@/components/autocomplete-field'
import { Avatar, Box, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { dinarFormat } from '@/utils/formats'
import { getInitials } from './CustomAvatar'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

AutoCompleteWarehouseProducts.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  warhouseId: PropTypes.number,
}

function AutoCompleteWarehouseProducts({
  onChange,
  disabled = false,
  warhouseId,
  ...other
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { data = [], isLoading } = useProductsQuery({
    page: 1,
    'filter[query]': search,
  })
  console.log(data)
  const { t } = useTranslation()

  const selectedHandler = (event, items = []) => {
    onChange && onChange(items)
  }

  const onInputChange = (event, newSearch = '') => {
    setSearch(newSearch)
  }

  //const filteredData = data.filter((el) => el.name.includes(search))

  const renderProductAvatar = (product) => {
    const img = product?.images?.[0]
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
      disabled={disabled}
      onChange={selectedHandler}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...other}
      // inputValue={search}
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

export default AutoCompleteWarehouseProducts
