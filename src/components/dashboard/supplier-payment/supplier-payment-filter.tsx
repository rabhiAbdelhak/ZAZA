import DateChipFilter from '@/components/DateChipFilter'
import QueryChipFilter from '@/components/QueryChipFilter'
import { Box, BoxProps } from '@mui/material'

type SupplierPaymentFilterProps = {
  filter?: SupplierPaymentsFilter
  onFilter: (filter: SupplierPaymentsFilter) => void
} & BoxProps

function SupplierPaymentFilter({
  filter,
  onFilter,
  ...boxProps
}: SupplierPaymentFilterProps) {
  const handleFilter = (data: Partial<SupplierPaymentsFilter>) => {
    onFilter({ ...filter, ...data, page: 0 })
  }

  const dates = {
    from: filter?.['filter[date_from]'] || '',
    to: filter?.['filter[date_to]'] || '',
  }

  return (
    <Box display="flex" gap={2} alignItems="center" py={1} {...boxProps}>
      <QueryChipFilter
        title="supplier"
        label={filter?.['filter[supplier_name]']}
        onDelete={() => handleFilter({ 'filter[supplier_name]': '' })}
      />
      <QueryChipFilter
        title="ref"
        label={filter?.['filter[tracking_code]']}
        onDelete={() => handleFilter({ 'filter[tracking_code]': '' })}
      />
      <DateChipFilter
        startDate={dates.from}
        endDate={dates.to}
        onDelete={() =>
          handleFilter({
            'filter[date_from]': '',
            'filter[date_to]': '',
          })
        }
      />
    </Box>
  )
}

export default SupplierPaymentFilter
