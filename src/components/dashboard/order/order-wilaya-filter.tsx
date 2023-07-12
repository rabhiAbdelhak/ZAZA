import { useWilayasQuery } from '@/queries/communes'
import { Input, MenuItem, Select, Typography } from '@mui/material'

type CompProps = {
  onApplyFilters: (newFilter: any) => void
  filter: any
}
const OrderWilayaFilter = (props: CompProps) => {
  const { onApplyFilters, filter } = props

  const { data: wilayas, isLoading, isError, error } = useWilayasQuery() as any

  return (
    <Select
      fullWidth
      autoComplete="Wilaya"
      sx={{
        minWidth: '200px',
        height: '35px',
        textTransform: 'capitalize',
        bgcolor: 'primary.contrast',
      }}
      name="wilaya_id"
      value={filter.wilaya_id}
      onChange={(e: any) =>
        onApplyFilters({ ...filter, wilaya_id: e.target.value })
      }
      onBlur={(e: any) =>
        onApplyFilters({ ...filter, wilaya_id: e.target.value })
      }
    >
      {wilayas?.map((wilaya: any) => {
        return (
          <MenuItem key={wilaya.id} value={wilaya.id}>
            {wilaya.name}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default OrderWilayaFilter
