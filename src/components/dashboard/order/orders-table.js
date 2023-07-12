import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { ResourceError } from '../../resource-error'
import OrderUsersTag from './order-users-tags'
import AddUserButton from '../../add-user-btn'
import { Pagination } from '../../pagination'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import { OrderMenu } from './order-menu'
import { dinarFormat } from '../../../utils/formats'
import TableLoading from '../table-loading'
import { useTranslation } from 'react-i18next'
import OrderStatusesFilter from './orders-statuses-filter'
import OrderUsersFilter from './order-users-filter'
import { ContentCopy } from '@mui/icons-material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

import toast from 'react-hot-toast'
import OrderStatusTag from './order-status-tag'
import InputFieldFilter from '../../input-field-filter'
import WilayaAutocomplete from '../../WilayaAutocomplete'
import OrderDateFilter from './orders-date-filter'
import { columns } from '../../../constants/tables-columns'
import { useState } from 'react'

export const OrdersTable = (props) => {
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    statusList,
    orders,
    ordersCount,
    page,
    selectedOrders,
    sort,
    sortBy,
    setSingleSelectedOrderId,
    pageSize,
    handleAssign,
    openDrawer,
    onOpenDrawer,
    filter,
    onFiltersApply,
    handleUnAssign,
  } = props

  const { t } = useTranslation()
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !orders.length)
  const displayData = Boolean(!isLoading && !error && orders.length)

  const handleSingleOrderSelection = (id) => {
    setSingleSelectedOrderId(id)
    onOpenDrawer()
  }
  const [pinnedColumns, setPinnedColumns] = useState([])

  const handlePinColumn = (columnName) => {
    // Check if the column is already pinned
    const index = pinnedColumns.indexOf(columnName)
    if (index === -1) {
      // Add the column to the pinned columns array
      setPinnedColumns([...pinnedColumns, columnName])
    } else {
      // Remove the column from the pinned columns array
      const newPinnedColumns = [...pinnedColumns]
      newPinnedColumns.splice(index, 1)
      setPinnedColumns(newPinnedColumns)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
      }}
    >
      <Divider />
      <Scrollbar>
        <TableContainer sx={{ maxHeight: openDrawer ? '580px' : '500px' }}>
          <Table sx={{ minWidth: 1000 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ bgcolor: 'neutral.50' }}>
                  <Checkbox
                    checked={
                      orders.length > 0 &&
                      selectedOrders.length === orders.length
                    }
                    disabled={isLoading}
                    indeterminate={
                      selectedOrders.length > 0 &&
                      selectedOrders.length < orders.length
                    }
                    onChange={onSelectAll}
                  />
                </TableCell>
                {columns?.map((column) => (
                  <TableCell key={column.id} sx={{ bgcolor: 'neutral.50' }}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sort : 'asc'}
                      disabled={isLoading}
                      onClick={(event) => onSortChange(event, column.id)}
                    >
                      <Typography noWrap variant="inherit">
                        {t('Attributes.' + column.label)}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ bgcolor: 'neutral.50' }} />
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell sx={{ px: 2, py: 1 }}>
                  <InputFieldFilter
                    value={filter?.id}
                    onChange={(event) =>
                      onFiltersApply({
                        ...filter,
                        order_id: event.target.value,
                      })
                    }
                    placeholder={t('Attributes.Tracking code')}
                    fullWidth
                    onClear={() =>
                      onFiltersApply({ ...filter, tracking_code: '' })
                    }
                  />
                </TableCell>
                <TableCell>
                  <OrderStatusesFilter
                    statusList={statusList}
                    onApplyFilters={onFiltersApply}
                    filter={filter}
                  />
                </TableCell>
                <TableCell>
                  <OrderUsersFilter
                    filter={filter}
                    onApplyFilters={onFiltersApply}
                  />
                </TableCell>
                <TableCell>
                  <InputFieldFilter
                    value={filter?.client_first_name}
                    onChange={(event) =>
                      onFiltersApply({
                        ...filter,
                        client_first_name: event.target.value,
                      })
                    }
                    placeholder={t('Attributes.First Name')}
                    fullWidth
                    onClear={() =>
                      onFiltersApply({
                        ...filter,
                        client_first_name: '',
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <InputFieldFilter
                    value={filter?.client_phone}
                    onChange={(event) =>
                      onFiltersApply({
                        ...filter,
                        client_phone: event.target.value,
                      })
                    }
                    placeholder={t('Attributes.Phone Number')}
                    fullWidth
                    onClear={() =>
                      onFiltersApply({
                        ...filter,
                        client_phone: '',
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <WilayaAutocomplete
                    label={null}
                    filter={filter}
                    value={filter?.wilaya_id}
                    placeholder={t('Attributes.State')}
                    onChange={(e, value) => {
                      onFiltersApply({ ...filter, wilaya_id: value?.id || '' })
                    }}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 240 }}>
                  <Box display="flex" gap={1}>
                    <InputFieldFilter
                      sx={{ maxWidth: 170 }}
                      placeholder="min price"
                      value={filter?.min_price || ''}
                      onChange={(event) =>
                        onFiltersApply({
                          ...filter,
                          min_price: event.target.value || '',
                        })
                      }
                      onClear={() =>
                        onFiltersApply({ ...filter, min_price: '' })
                      }
                    />
                    <InputFieldFilter
                      sx={{ maxWidth: 160 }}
                      placeholder="max price"
                      value={filter?.max_price || ''}
                      onChange={(event) =>
                        onFiltersApply({
                          ...filter,
                          max_price: event.target.value || '',
                        })
                      }
                      onClear={() =>
                        onFiltersApply({ ...filter, max_price: '' })
                      }
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <InputFieldFilter
                    fullWidth
                    value={filter?.source}
                    onChange={(event) =>
                      onFiltersApply({
                        ...filter,
                        source: event.target.value,
                      })
                    }
                    placeholder={t('Attributes.Lead Source')}
                    onClear={() =>
                      onFiltersApply({
                        ...filter,
                        source: '',
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <OrderDateFilter
                    filter={filter}
                    onFiltersApply={onFiltersApply}
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {displayData && (
              <TableBody>
                {orders.map((order) => {
                  const statusVariant =
                    statusList.find((status) => status.id === order.status) ||
                    statusList.find((status) => status.id === 3)
                  return (
                    <TableRow
                      hover
                      sx={{
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSingleOrderSelection(order.id)}
                      key={order.id}
                      selected={
                        !!selectedOrders.find(
                          (selectedOrder) => selectedOrder === order.id,
                        )
                      }
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{
                          position: pinnedColumns.includes(order.id)
                            ? 'sticky'
                            : 'static',
                          left: pinnedColumns.indexOf(order.id) * 100,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={
                            !!selectedOrders.find(
                              (selectedOrder) => selectedOrder === order.id,
                            )
                          }
                          onChange={(event) => onSelect(event, order.id)}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            bgcolor: 'neutral.200',
                            borderRadius: '20px',
                            justifyContent: 'space-between',
                            py: '3px',
                            px: 2,
                            width: '180px',
                          }}
                        >
                          {`${order.tracking_code}`}
                          <IconButton
                            sx={{ minWidth: 0, minHeight: 0, p: '3px' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              navigator.clipboard
                                .writeText(order.tracking_code)
                                .then((data) => {
                                  toast.success(
                                    'Text Copied : ' + order.tracking_code,
                                  )
                                })
                            }}
                          >
                            <ContentCopy sx={{ fontSize: '18px' }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <OrderStatusTag
                          order={order}
                          statusVariant={statusVariant}
                        />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {Boolean(order?.assigned_users?.length) ? (
                          <OrderUsersTag
                            order={order}
                            handleAssign={handleAssign}
                            handleUnAssign={handleUnAssign}
                          />
                        ) : (
                          <AddUserButton
                            order={order}
                            handleAssign={handleAssign}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ maxWidth: '200px' }}
                        title={
                          order.client_first_name + ' ' + order.client_last_name
                        }
                      >
                        <Typography
                          noWrap
                          variant="inherit"
                        >{`${order.client_first_name} ${order.client_last_name}`}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="inherit">
                          <Chip
                            component={Link}
                            href={`tel:${order.client_phone}`}
                            size="small"
                            icon={<LocalPhoneIcon sx={{ fontSize: 18 }} />}
                            onClick={(e) => e.stopPropagation()}
                            sx={{ color: 'text.primary' }}
                            label={order.client_phone}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap color="inherit" variant="inherit">
                          {`${order?.commune ? order.commune + ' - ' : ''}${
                            order.wilaya
                          }`}
                        </Typography>
                        <Typography
                          noWrap
                          color="textSecondary"
                          variant="inherit"
                        >
                          {order.courier}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" noWrap>
                          {dinarFormat(order.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" noWrap>
                          {order.source}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography noWrap color="inherit" variant="inherit">
                            {format(new Date(order.created_at), 'dd MMM yyyy')}{' '}
                            {'-'}
                          </Typography>

                          <Typography
                            noWrap
                            color="textSecondary"
                            variant="inherit"
                          >
                            {format(new Date(order.created_at), 'HH:mm')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <OrderMenu
                          orderid={order.id}
                          assignedto={order.assigned_users?.[0]?.id}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      {displayLoading && <TableLoading />}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        pageSize={pageSize}
        rowsCount={ordersCount}
      />
    </Box>
  )
}

OrdersTable.defaultProps = {
  orders: [],
  ordersCount: 0,
  page: 1,
  selectedOrders: [],
  sort: 'desc',
  sortBy: 'createdAt',
}

OrdersTable.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSortChange: PropTypes.func,
  orders: PropTypes.array,
  ordersCount: PropTypes.number,
  page: PropTypes.number,
  selectedOrders: PropTypes.array,
  sort: PropTypes.oneOf(['asc', 'desc']),
  sortBy: PropTypes.string,
}
