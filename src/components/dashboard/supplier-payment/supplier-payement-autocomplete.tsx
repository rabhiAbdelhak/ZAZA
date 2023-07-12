import { AutocompleteField } from '@/components/autocomplete-field'
import CustomAvatar from '@/components/CustomAvatar'
import { useSuppliersQuery } from '@/queries/supplier'
import { Avatar, Box, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

const defaultFilter: SupplierListFilter = {
  page: 0,
  'filter[has_payments]': 1,
  'filter[name]': '',
}
type SupplierPaymentAutocompleteProps = {
  disabled?: boolean
  error?: boolean
  helperText?: ReactNode
  value?: Supplier
  placeholder?: string
  onChange: (supplier: Supplier) => void
}

function SupplierPaymentAutocomplete({
  disabled = false,
  error = false,
  helperText,
  onChange,
  placeholder,
  value,
}: SupplierPaymentAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const { data, isLoading } = useSuppliersQuery(filter, { enabled: open })
  const { t } = useTranslation()

  const onInputChange = (event: any, newSearch = '') => {
    setFilter((prev) => ({ ...prev, 'filter[name]': newSearch }))
  }

  const renderProductAvatar = (item: Supplier) => {
    return (
      <Box sx={{ flexGrow: 1 }} display="flex" gap={2} alignItems="center">
        <CustomAvatar src={item?.logo} alt={item.name} label={item.name} />
        <Typography noWrap variant="body2">
          {item.name}
        </Typography>
      </Box>
    )
  }

  return (
    <AutocompleteField
      value={value}
      disabled={disabled}
      error={error}
      helperText={helperText as any}
      onChange={(e, value: any) => onChange(value)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={filter['filter[name]']}
      onInputChange={onInputChange}
      options={data?.data || []}
      loading={isLoading}
      placeholder={placeholder}
      getOptionLabel={(option) => option?.name || ''}
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

export default SupplierPaymentAutocomplete
