import Proptypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Pagination } from '../../pagination'
import { ResourceError } from '../../resource-error'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../utils/formats'
import { InputField } from '../../input-field'
// import { ProductMenu } from "./product-menu";
import CloseIcon from '@mui/icons-material/Close'
import InputFieldFilter from '../../input-field-filter'

export const ProductsTable = (props) => {
  const {
    error,
    isLoading,
    onPageChange,
    page,
    products,
    productsCount,
    selectedProducts,
    pageSize = 10,
    onClickItem,
    filter,
    onFilter,
    onSelectProduct,
    openDrawer,
  } = props

  const { t } = useTranslation()
  const columns = [
    { id: 'name', label: t('products.Name') },
    { id: 'reference', label: t('products.Reference') },
    { id: 'provider', label: t('products.Provider') },
    { id: 'globalQte', label: t('products.GlobalQty') },
    {
      id: 'sellingPrice#1',
      label: t('products.SellingPrice#', { num: 1 }),
      align: 'right',
    },
  ]

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !products.length)

  const handleFilter = (objectFilter) => {
    if (onFilter) {
      onFilter({ ...filter, ...objectFilter })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <TableContainer
        sx={{
          minWidth: openDrawer ? '500px' : '700px',
          height: openDrawer ? '480px' : '400px',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ bgcolor: 'neutral.100' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ px: 2, py: 1 }}>
                <InputFieldFilter
                  value={filter?.['filter[name]']}
                  onChange={(event) =>
                    handleFilter({ 'filter[name]': event.target.value || '' })
                  }
                  placeholder={t(
                    'products.Namraw3a.officiel@gmail.come',
                  ).toLowerCase()}
                  fullWidth
                  onClear={() => handleFilter({ 'filter[reference]': '' })}
                />
              </TableCell>
              <TableCell sx={{ px: 2, py: 1 }}>
                <InputFieldFilter
                  value={filter?.['filter[reference]']}
                  placeholder={t('products.Reference').toLowerCase()}
                  onChange={(event) =>
                    handleFilter({
                      'filter[reference]': event.target.value || '',
                    })
                  }
                  fullWidth
                  onClear={() => handleFilter({ 'filter[reference]': '' })}
                />
              </TableCell>
              <TableCell sx={{ px: 2, py: 1 }}>
                <InputFieldFilter
                  value={filter?.['filter[provider]']}
                  placeholder={t('products.Provider').toLowerCase()}
                  onChange={(event) =>
                    handleFilter({
                      'filter[provider]': event.target.value || '',
                    })
                  }
                  fullWidth
                  onClear={() => handleFilter({ 'filter[provider]': '' })}
                />
              </TableCell>
              <TableCell sx={{ px: 2, py: 1 }}>
                <Box display="flex" gap={1}>
                  <InputFieldFilter
                    sx={{ maxWidth: 100 }}
                    placeholder="min"
                    value={filter?.['filter[min_quantity]']}
                    onChange={(event) =>
                      handleFilter({
                        'filter[min_quantity]': event.target.value || '',
                      })
                    }
                    onClear={() => handleFilter({ 'filter[min_quantity]': '' })}
                  />
                  <InputFieldFilter
                    sx={{ maxWidth: 100 }}
                    placeholder="max"
                    value={filter?.['filter[max_quantity]']}
                    onChange={(event) =>
                      handleFilter({
                        'filter[max_quantity]': event.target.value || '',
                      })
                    }
                    onClear={() => handleFilter({ 'filter[max_quantity]': '' })}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ px: 2, py: 1 }}>
                <InputFieldFilter
                  value={filter?.['filter[price1]']}
                  placeholder={t('Filters.Price').toLowerCase()}
                  onChange={(event) =>
                    handleFilter({
                      'filter[price1]': event.target.value || '',
                    })
                  }
                  fullWidth
                  onClear={() => handleFilter({ 'filter[price1]': '' })}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          {!displayLoading && (
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    sx={{ cursor: onClickItem ? 'pointer' : 'default' }}
                    hover
                    key={product.id}
                    selected={
                      !!selectedProducts.find(
                        (selectedCustomer) => selectedCustomer === product.id,
                      )
                    }
                  >
                    <TableCell sx={{ width: 300 }}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          width: 300,
                        }}
                      >
                        <Avatar
                          alt={product.name}
                          src={product.images?.[0]}
                          variant="rounded"
                        />
                        <Typography
                          noWrap
                          color="inherit"
                          sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            ml: 2,
                            blockOverflow: 'ellipsis',
                            WebkitLineClamp: 2,
                          }}
                          variant="subtitle2"
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap variant="inherit" colo="inherit">
                        {product.reference}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.provider}</TableCell>
                    <TableCell align="left">{product.quantity}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" noWrap>
                        {dinarFormat(product.price1)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError error={error} sx={{ flexGrow: 1, m: 2 }} />
      )}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        pageSize={pageSize}
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={productsCount}
      />
    </Box>
  )
}

ProductsTable.defaultProps = {
  page: 1,
  products: [],
  productsCount: 0,
  selectedProducts: [],
  sort: 'desc',
  sortBy: 'createdAt',
  pageSize: 10,
}

ProductsTable.propTypes = {
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onClickItem: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  products: Proptypes.array,
  productsCount: Proptypes.number,
  pageSize: Proptypes.number,
  selectedProducts: Proptypes.array,
  sort: Proptypes.oneOf(['asc', 'desc']),
  sortBy: Proptypes.string,
  filter: Proptypes.object,
  onFilter: Proptypes.func,
}
