import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Pagination } from '../../pagination'
import { ResourceError } from '../../resource-error'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import { useTranslation } from 'react-i18next'

function StocksTable(props) {
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page = 0,
    stocks = [],
    stocksCount = 0,
    selectedStocks = [],
    sort,
    sortBy,
    pageSize = 10,
  } = props

  const { t } = useTranslation()
  const columns = [
    { id: 'name', label: t('stocks.Name') },
    { id: 'reference', label: t('stocks.Reference') },
    { id: 'provider', label: t('stocks.Provider') },
    { id: 'inStock', label: t('stocks.InStock'), align: 'right' },
    { id: 'inConfirmation', label: t('stocks.InConfirmation'), align: 'right' },
    { id: 'delivering', label: t('stocks.Delivering'), align: 'right' },
    { id: 'damaged', label: t('stocks.Damaged'), align: 'right' },
  ]

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !stocks.length)

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={stocks.length > 0 && selectedStocks.length === stocks.length}
                  disabled={isLoading}
                  indeterminate={selectedStocks.length > 0 && selectedStocks.length < stocks.length}
                  onChange={onSelectAll}
                />
              </TableCell> */}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : 'asc'}
                    disabled
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!displayLoading && (
            <TableBody>
              {stocks.map((stockItem) => {
                return (
                  <TableRow
                    // onClick={(e) => onClickItem && onClickItem(stockItem?.id)}
                    // sx={{ cursor: onClickItem ? "pointer" : "default" }}
                    hover
                    key={stockItem.id}
                    selected={
                      !!selectedStocks.find((id) => id === stockItem.id)
                    }
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={!!selectedStocks.find((id) => id === stockItem.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onSelect && onSelect(e, stockItem.id)}
                      />
                    </TableCell> */}
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Avatar
                          alt={stockItem.name}
                          src={stockItem?.product?.images[0]}
                          variant="rounded"
                        />
                        <Typography
                          color="inherit"
                          noWrap
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
                          {stockItem?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{stockItem?.reference}</TableCell>
                    <TableCell>{stockItem?.provider}</TableCell>
                    <TableCell align="right">{stockItem?.quantity}</TableCell>
                    <TableCell align="right">
                      {stockItem?.quantity_in_confirmation}
                    </TableCell>
                    <TableCell align="right">
                      {stockItem?.quantity_delivery}
                    </TableCell>
                    <TableCell align="right">
                      {stockItem?.quantity_damaged}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </Scrollbar>
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
        rowsCount={stocksCount}
      />
    </Box>
  )
}

StocksTable.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSortChange: PropTypes.func,
  page: PropTypes.number,
  stocks: PropTypes.array,
  stocksCount: PropTypes.number,
  pageSize: PropTypes.number,
  selectedStocks: PropTypes.array,
  sort: PropTypes.oneOf(['asc', 'desc']),
  sortBy: PropTypes.string,
}

export default StocksTable
