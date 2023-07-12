import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Box,
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

function StorageLogTable(props) {
  const {
    error,
    isLoading,
    onPageChange,
    onSortChange,
    page,
    storages = [],
    storagesCount = 0,
    sort,
    sortBy,
    pageSize = 10,
  } = props

  const { t } = useTranslation()

  const columns = [
    { id: 'reference', label: t('storageLog.Reference') },
    { id: 'name', label: t('storageLog.Name') },
    { id: 'initialState', label: t('storageLog.InitialState'), align: 'right' },
    { id: 'intoStorage', label: t('storageLog.IntoStorage'), align: 'right' },
    { id: 'outStorage', label: t('storageLog.OutStorage'), align: 'right' },
    { id: 'event', label: t('storageLog.Event') },
    { id: 'finalState', label: t('storageLog.FinalState'), align: 'right' },
    { id: 'date', label: t('storageLog.Date') },
  ]

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !storages.length)

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
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
              {storages.map((storage) => {
                return (
                  <TableRow hover key={storage.id}>
                    <TableCell>{storage?.product?.reference}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography noWrap variant="body2">
                        {storage?.product?.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{storage.quantity}</TableCell>
                    <TableCell align="right">{storage.quantity_in}</TableCell>
                    <TableCell align="right">{storage.quantity_out}</TableCell>
                    <TableCell>{storage.event}</TableCell>
                    <TableCell align="right">{storage.quantity_end}</TableCell>
                    <TableCell padding="checkbox" sx={{ px: 2 }}>
                      <Typography variant="body2">
                        {format(new Date(storage.created_at), 'dd/MM/yyyy')}
                      </Typography>
                      <Typography variant="body2">
                        {format(new Date(storage.created_at), 'hh:mm')}
                      </Typography>
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
        rowsCount={storagesCount}
      />
    </Box>
  )
}

StorageLogTable.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  onSortChange: PropTypes.func,
  page: PropTypes.number,
  storages: PropTypes.array,
  storagesCount: PropTypes.number,
  pageSize: PropTypes.number,
  sort: PropTypes.oneOf(['asc', 'desc']),
  sortBy: PropTypes.string,
}

export default StorageLogTable
