import { CheckOutlined, TextFormatSharp } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Fade,
  Paper,
  Popper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box, CardHeader, TableBody } from '@mui/material/node'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { searchProducts } from '../../api/product'
import { useSearchProductsQuery } from '../../queries/product'
import { debounce } from '../../utils/debounce'
import { InputField } from '../input-field'
import { ResourceUnavailable } from '../resource-unavailable'
import ProductSelectionRow from './product-selection-row'
import ProductToSelectRow from './productto-select-row'
import TableLoading from './table-loading'

const ProductsSelection = ({
  handleAdd,
  handleRemove,
  onChangePrice,
  selectedProducts,
  onChangeAmount,
}) => {
  const { t } = useTranslation()
  const [term, setTerm] = useState()
  const {
    data: searchedProducts,
    isLoading,
    isError,
    error,
  } = useSearchProductsQuery({ term, options: {} })
  const [popTarget, setPopTarget] = useState(null)
  const [openPoper, setOpenPoper] = useState(false)

  const handleSearchChange = (e) => {
    debounce(() => setTerm(e.target.value))()
  }

  const isSelected = (id) => {
    return Boolean(selectedProducts.find((pr) => pr.id === id))
  }
  return (
    <Card sx={{ margin: '20px auto', borderRadius: '16px' }}>
      <CardHeader title={'1. ' + t('products.Select your products')} />
      <CardContent>
        <Box>
          <InputField
            placeholder={t('SearchInput')}
            fullWidth
            onChange={handleSearchChange}
            onBlur={() => setOpenPoper(false)}
            onFocus={() => setOpenPoper(true)}
          />
          <div ref={setPopTarget} style={{ width: '100%' }}></div>
          <Popper
            sx={{ width: `${popTarget?.clientWidth}px`, zIndex: 4000 }}
            open={openPoper}
            anchorEl={popTarget}
            placement="bottom"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ maxHeight: '220px', overflow: 'auto' }}>
                  {searchedProducts && searchedProducts.length > 0 ? (
                    <Box>
                      {searchedProducts.map((product) => {
                        if (selectedProducts.filter((p) => p.id === product.id))
                          return (
                            isSelected(product.id) || (
                              <ProductToSelectRow
                                key={product.id}
                                product={product}
                                handleAdd={handleAdd}
                                isSelected={isSelected}
                              />
                            )
                          )
                      })}
                    </Box>
                  ) : isLoading ? (
                    <TableLoading />
                  ) : (
                    <Box sx={{ p: 1 }}>
                      <Typography variant="caption" color="secondary">
                        No results
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Attributes.Name')}</TableCell>
            <TableCell>{t('Attributes.Selling price')}</TableCell>
            <TableCell>{t('Attributes.Quantity')}</TableCell>
            <TableCell>{t('Attributes.ID')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts.map((product) => {
            return (
              <ProductSelectionRow
                key={product.id}
                product={product}
                onChangeAmount={onChangeAmount}
                onChangePrice={onChangePrice}
                handleRemove={handleRemove}
              />
            )
          })}
        </TableBody>
      </Table>
      {selectedProducts.length === 0 && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
    </Card>
  )
}

export default ProductsSelection
