import EditableTextInput from '@/components/EditableTextInput'
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { dinarFormat } from '@/utils/formats'
import PurchaseOrderToolbar from './pruchase-order-toolbar'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { useState } from 'react'
import AutocompleteSupplierProducts from '@/components/AutocompleteSupplierProducts'
import CustomAvatar from '@/components/CustomAvatar'

type PurchaseOrderProductsProps = {
  products?: PurchaseOrderProduct[]
  onChange?: (products: PurchaseOrderProduct[]) => void
  onBlur?: () => void
  disabled?: boolean
  error?: boolean
  supplierId?: number
}

function PurchaseOrderProducts({
  products = [],
  onChange,
  disabled = false,
  error = false,
  onBlur,
  supplierId,
}: PurchaseOrderProductsProps) {
  const [selected, setSelected] = useState<PurchaseOrderProduct[]>([])

  const isItemChecked = (item: PurchaseOrderProduct) => {
    return selected.includes(item)
  }

  const onCheckItem = (item: PurchaseOrderProduct) => {
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

  const handleSelect = (newProduct: SupplierProduct) => {
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
          } as PurchaseOrderProduct,
          ...products,
        ]
    onChange(newProducts)

    onBlur && onBlur()
  }

  const handleChange = (newProduct: PurchaseOrderProduct) => {
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
  const total = products.reduce((prev, next) => {
    return prev + next.quantity * next.unit_price
  }, 0)

  const productsDisabled = !supplierId || disabled
  return (
    <Box>
      <Box mb={1}>
        <PurchaseOrderToolbar
          error={error}
          numSelected={selected?.length}
          onRemove={handleRemove}
        />
        <AutocompleteSupplierProducts
          value={{}}
          supplierId={supplierId}
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
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
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
                    <TableCell align="right" sx={{ maxWidth: 300 }}>
                      <EditableTextInput
                        disabled={productsDisabled}
                        typographyProps={{
                          sx: { fontSize: 'inherit', color: 'inherit' },
                        }}
                        type="number"
                        textValue={dinarFormat(el.unit_price)}
                        value={el.unit_price}
                        onBlur={onBlur}
                        onChange={(e) =>
                          handleChange({
                            ...el,
                            unit_price: Number(e.target.value),
                          })
                        }
                        inputProps={{
                          sx: { p: 0, textAlign: 'right' },
                          min: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: 400 }}>
                      {dinarFormat(el.unit_price * el.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align="right" sx={{ pt: 4 }}>
                    <Typography variant="subtitle2">Total</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ pt: 4 }}>
                    <Typography variant="subtitle2">
                      {dinarFormat(total)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
        {!hasProducts && <ResourceUnavailable sx={{ flexGrow: 1 }} />}
      </Card>
    </Box>
  )
}

export default PurchaseOrderProducts
