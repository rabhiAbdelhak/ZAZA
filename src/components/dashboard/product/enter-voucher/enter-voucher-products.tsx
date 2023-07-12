import EditableTextInput from '@/components/EditableTextInput'
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { useState } from 'react'
import AutoCompleteWarehouseProducts from '@/components/auto-complete-warehouse-products'
import CustomAvatar from '@/components/CustomAvatar'
import ExitVoucherToolbar from './enter-voucher-toolbar'

type ExitVoucherProductsProps = {
  products?: ExitVoucherProduct[]
  onChange?: (products: ExitVoucherProduct[]) => void
  onBlur?: () => void
  disabled?: boolean
  error?: boolean
  warehouseId?: number
}

function ExitVoucherProducts({
  products = [],
  onChange,
  disabled = false,
  error = false,
  onBlur,
  warehouseId,
}: ExitVoucherProductsProps) {
  const [selected, setSelected] = useState<ExitVoucherProduct[]>([])

  const isItemChecked = (item: ExitVoucherProduct) => {
    return selected.includes(item)
  }

  const onCheckItem = (item: ExitVoucherProduct) => {
    setSelected(
      isItemChecked(item)
        ? selected.filter((el) => el !== item)
        : [...selected, item],
    )
  }

  const onCheckAllToggle = () => {
    setSelected(selected.length < products.length ? products : [])
  }

  const handleRemove = () => {
    if (!onChange) {
      return
    }
    onChange(products.filter((el) => !isItemChecked(el)))
    onBlur && onBlur()
    setSelected([])
  }

  const handleSelect = (newProduct: WarhouseProduct) => {
    if (!onChange || !newProduct) {
      return
    }

    const exist = products.find((item) => item.product_id === newProduct.id)
    const newProducts = exist
      ? products
      : [
          {
            name: newProduct.name,
            product_id: newProduct.id,
            unit_price: newProduct.price,
            quantity: 1,
            images: newProduct.images,
          } as ExitVoucherProduct,
          ...products,
        ]
    onChange(newProducts)

    onBlur && onBlur()
  }

  const handleChange = (newProduct: ExitVoucherProduct) => {
    if (!onChange) {
      return
    }
    onChange(
      products.map((el) =>
        el.product_id !== newProduct.product_id ? el : newProduct,
      ),
    )
  }

  const hasProducts = Boolean(products.length)

  const productsDisabled = !warehouseId || disabled
  return (
    <Box>
      <Box mb={1}>
        <ExitVoucherToolbar
          error={error}
          numSelected={selected?.length}
          onRemove={handleRemove}
        />
        <AutoCompleteWarehouseProducts
          value={{}}
          warhouseId={warehouseId}
          disabled={productsDisabled}
          multiple={false}
          onChange={handleSelect}
        />
      </Box>
      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={!products.length || productsDisabled}
                  onClick={() => onCheckAllToggle()}
                  color="primary"
                  indeterminate={
                    selected.length < products.length && selected.length > 0
                  }
                  checked={selected.length > 0}
                />
              </TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          {hasProducts && (
            <>
              <TableBody>
                {products.map((el, index) => (
                  <TableRow key={el.product_id + '-' + index} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() => onCheckItem(el)}
                        color="primary"
                        checked={isItemChecked(el)}
                        disabled={productsDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={2} alignItems="center">
                        <CustomAvatar
                          size={32}
                          src={el?.images?.[0] || ''}
                          hiddenTooltip
                          variant="rounded"
                          label={el?.name}
                          alt={el?.name}
                        />
                        <Typography noWrap fontSize="inherit" color="inherit">
                          {el?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: 200 }}>
                      <EditableTextInput
                        typographyProps={{
                          sx: { fontSize: 'inherit', color: 'inherit' },
                        }}
                        disabled={productsDisabled}
                        type="number"
                        textValue={el.quantity}
                        value={el.quantity}
                        inputProps={{
                          sx: { p: 0, textAlign: 'right' },
                          min: 1,
                        }}
                        onBlur={onBlur}
                        onChange={(e) =>
                          handleChange({
                            ...el,
                            quantity: Number(e.target.value),
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
        {!hasProducts && <ResourceUnavailable sx={{ flexGrow: 1 }} />}
      </Card>
    </Box>
  )
}

export default ExitVoucherProducts
