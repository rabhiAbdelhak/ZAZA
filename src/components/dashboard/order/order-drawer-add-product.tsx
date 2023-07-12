import { Plus } from '@/icons/plus'
import { Order } from '@/types/order'
import {
  Button,
  Card,
  CardContent,
  Fade,
  Paper,
  Popper,
  Typography,
  Box,
  CardHeader,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { useSearchProductsQuery } from '../../../queries/product'
import { debounce } from '../../../utils/debounce'
import { InputField } from '../../input-field'
import TableLoading from '../../table-loading'
import ProductToSelectRow from '../productto-select-row'
import NoData from '@/components/no-data'

type CompProps = {
  order: Order
  selectedProducts: any
  onAdd: (product: {
    product_id: number
    price: number
    quantity: number
  }) => void
}

const OrderDrawerAddProduct = (props: CompProps) => {
  const { order, selectedProducts, onAdd } = props
  const { t } = useTranslation()
  const [isAdding, setIsAdding] = useState(false)
  const [term, setTerm] = useState('')
  const {
    data: searchedProducts,
    isLoading,
    isError,
    error,
  } = useSearchProductsQuery({ term, options: {} }) as any
  const popTarget = useRef(null) as any
  const [openPoper, setOpenPoper] = useState(false)

  const handleSearchChange = (e: any) => {
    debounce(() => setTerm(e.target.value))()
  }

  const isSelected = (id: number) => {
    return Boolean(selectedProducts!?.find((pr: any) => pr.id === id))
  }
  const handleClosePoper = () => {
    setTerm('')
  }

  const AddingBox = (
    <Box>
      <InputField
        placeholder={t('SearchInput')}
        fullWidth
        onChange={handleSearchChange}
        onBlur={() => setOpenPoper(false)}
        InputProps={{
          onFocus: () => setOpenPoper(true),
        }}
      />
      <div ref={popTarget} style={{ width: '100%' }}></div>
    </Box>
  )

  return (
    <>
      {isAdding ? (
        AddingBox
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="outlined"
          color="secondary"
          sx={{ border: '1px dashed', width: '100%' }}
          startIcon={<Plus />}
        >
          {t('products.Add Product')}
        </Button>
      )}
      <Popper
        sx={{ width: `${popTarget.current?.clientWidth}px`, zIndex: 4000 }}
        open={openPoper}
        anchorEl={popTarget.current}
        placement="bottom"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ maxHeight: '220px', overflow: 'auto' }}>
              {searchedProducts && searchedProducts.length > 0 ? (
                <Box>
                  {searchedProducts.map((product: any) => {
                    return isSelected(product.id) ||
                      product.quantity <= 0 ? null : (
                      <ProductToSelectRow
                        key={product.id}
                        product={product}
                        handleAdd={() => {
                          onAdd({
                            price: product.suggested_price,
                            quantity: 1,
                            product_id: product.id,
                          })
                          setOpenPoper(false)
                          setIsAdding(false)
                        }}
                        isSelected={isSelected}
                      />
                    )
                  })}
                </Box>
              ) : isLoading ? (
                <TableLoading />
              ) : (
                <Box sx={{ p: 1 }}>
                  <NoData />
                </Box>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default OrderDrawerAddProduct
