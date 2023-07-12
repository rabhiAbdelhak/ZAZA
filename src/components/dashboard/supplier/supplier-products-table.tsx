import AutocompleteProducts from '@/components/AutocompleteProducts'
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CustomAvatar from '@/components/CustomAvatar'
import EditableTextInput from '../../EditableTextInput'
import EditIcon from '@mui/icons-material/Edit'
import SupplierEnhancedToolbar from './SupplierEnhancedToolbar'
import { useMemo } from 'react'
import { dinarFormat } from '@/utils/formats'
import TableLoading from '@/components/table-loading'
import { ResourceUnavailable } from '@/components/resource-unavailable'

type SupplierProductsProps = {
  products?: SupplierProduct[]
  selectedProductsId?: number[]
  onChange: (products: SupplierProduct[]) => void
  onRemove: (productsIds: number[]) => void
  disabled?: boolean
  isLoading?: boolean
  selectedIds?: number[]
  onSelectedIds: (data: number[]) => void
}

function SupplierProductsTable({
  products = [],
  onChange,
  onRemove,
  disabled = false,
  isLoading = false,
  selectedIds = [],
  onSelectedIds,
}: SupplierProductsProps) {
  const handleChange = (values: any[]) => {
    const formattedProducts: SupplierProduct[] = values.map((el) => ({
      id: el.id,
      name: el.name,
      image: el?.images,
      price: el?.price || 1,
      selected: el?.selected || false,
    }))
    onChange(formattedProducts)
  }

  const editItem = (item: SupplierProduct, price: number) => {
    const newItems = products.map((el) =>
      el.id !== item.id ? el : { ...el, price },
    )
    handleChange(newItems)
  }

  const handleRemove = () => {
    onRemove(selectedIds)
  }

  const isItemChecked = (item: SupplierProduct) => {
    return selectedIds.includes(item.id)
  }

  const onCheckAllToggle = () => {
    onSelectedIds(
      selectedIds.length < products.length ? products.map((el) => el.id) : [],
    )
  }

  const onCheckItem = (item: SupplierProduct) => {
    onSelectedIds(
      isItemChecked(item)
        ? selectedIds.filter((el) => el !== item.id)
        : [...selectedIds, item.id],
    )
  }

  const displayUnavailable = Boolean(!isLoading && !products.length)

  return (
    <Box>
      <SupplierEnhancedToolbar
        title="Products"
        onRemove={handleRemove}
        hasAdd={false}
        numSelected={selectedIds.length}
        disabled={disabled}
      />

      <AutocompleteProducts value={products} onChange={handleChange} />

      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                onClick={() => onCheckAllToggle()}
                disabled={!products.length || disabled}
                color="primary"
                indeterminate={
                  selectedIds.length < products.length && selectedIds.length > 0
                }
                checked={selectedIds.length > 0}
              />
            </TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((el) => (
            <TableRow key={el.id} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={disabled}
                  onClick={() => onCheckItem(el)}
                  color="primary"
                  checked={isItemChecked(el)}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" gap={2} alignItems="center">
                  <CustomAvatar
                    size={32}
                    src={el?.images?.[0] || ''}
                    hiddenTooltip
                    variant="rounded"
                    label={el.name}
                    alt={el.name}
                  />
                  <Typography noWrap fontSize="inherit" color="inherit">
                    {el?.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <EditableTextInput
                    disabled={disabled}
                    textValue={dinarFormat(el?.price)}
                    defaultValue={el?.price}
                    typographyProps={{
                      sx: {
                        fontSize: 'inherit',
                        color: 'inherit',
                        width: 'fit-content',
                        alignSelf: 'flex-end',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                      noWrap: true,
                    }}
                    sx={{
                      fontSize: 'inherit',
                      height: 30,
                      textAlign: 'right',
                    }}
                    inputProps={{ min: 0, sx: { textAlign: 'right' } }}
                    type="number"
                    onBlur={(e) => editItem(el, Number(e.target.value || 0))}
                    placeholder="price DZD"
                    icon={
                      <EditIcon
                        sx={{
                          fontSize: 16,
                          ml: 1 / 2,
                        }}
                        color="inherit"
                      />
                    }
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <TableLoading />}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1 }} />}
    </Box>
  )
}

export default SupplierProductsTable
