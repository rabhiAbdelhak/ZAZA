import {
  Box,
  Checkbox,
  Divider,
  Link,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  TableCell,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../../utils/formats'
import { Pagination } from '../../../pagination'
import { ResourceError } from '../../../resource-error'
import { ResourceUnavailable } from '../../../resource-unavailable'
import { Scrollbar } from '../../../scrollbar'
import { StatusBadge } from '../../../status-badge'
import TableLoading from '../../table-loading'
import PaymentMenu from './payment-menu'

const columns = [
  {
    id: 'tracking_code',
    label: 'Tracking code',
  },
  {
    id: 'created_at',
    label: 'Date',
  },
  {
    id: 'total_commandes',
    label: 'Total Orders',
  },
  {
    id: 'total_delivred',
    label: 'Delivered',
  },
  {
    id: 'total_back',
    label: 'Returned',
  },
  {
    id: 'total_cod',
    label: 'Total COD(DZD)',
  },
  {
    id: 'total_pakages',
    label: 'Number of Packages',
  },
  {
    id: 'status_name',
    label: 'Payment Status',
  },
]

const PaymentTable = (props) => {
  const {
    payments,
    confirmPayment,
    selectedPayments,
    paymentStatusVariant,
    page,
    pageSize,
    onSelect,
    onSelectAll,
    onPageChange,
    error,
    isLoading,
    totalPayments,
    sort,
    sortBy,
  } = props
  const { t } = useTranslation()
  const displayLoading = Boolean(isLoading && !error)
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !payments.length)
  const displayData = Boolean(!isLoading && !error && payments)

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
        {displayData && (
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      payments?.length > 0 &&
                      selectedPayments?.length === payments?.length
                    }
                    disabled={isLoading}
                    indeterminate={
                      selectedPayments?.length > 0 &&
                      selectedPayments?.length < payments?.length
                    }
                    onChange={onSelectAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sort : 'asc'}
                      disabled={isLoading}
                      onClick={(event) => onSortChange(event, column.id)}
                    >
                      <Typography noWrap color="inherit" variant="inherit">
                        {`${t('Attributes.' + column.label)}`}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => {
                const paymentStatus = paymentStatusVariant.find(
                  (status) => status.name.fr === payment.status,
                )
                return (
                  <TableRow
                    hover
                    key={payment.id}
                    selected={
                      !!selectedPayments?.find(
                        (selectedPayement) => selectedPayement === payment.id,
                      )
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          !!selectedPayments?.find(
                            (selectedPayement) =>
                              selectedPayement === payment.id,
                          )
                        }
                        onChange={(event) => onSelect(event, payment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <NextLink
                        href={'/dashboard/payments/' + payment.id}
                        passHref
                      >
                        <Link
                          color="inherit"
                          component="a"
                          underline="none"
                          variant="subtitle2"
                        >
                          <Typography noWrap color="inherit" variant="inherit">
                            {`${payment.tracking_code}`}
                          </Typography>
                        </Link>
                      </NextLink>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                      >
                        <Typography noWrap color="inherit" variant="inherit">
                          {format(new Date(payment.created_at), 'dd MMM yyyy')}
                        </Typography>
                        <br></br>
                        <Typography color="textSecondary" variant="inherit">
                          {format(new Date(payment.created_at), 'HH:mm')}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap color="inherit" variant="inherit">
                        {`${payment?.total_market_order || '-'}`}
                      </Typography>
                    </TableCell>
                    <TableCell>{`${dinarFormat(
                      payment.total_delivred,
                    )}`}</TableCell>
                    <TableCell>
                      {payment.total_back > 0
                        ? dinarFormat(payment?.total_back)
                        : payment.total_back === 0
                        ? '-'
                        : dinarFormat(-payment?.total_back)}
                    </TableCell>
                    <TableCell>
                      <Typography noWrap color="inherit" variant="inherit">
                        {payment.total_cod >= 0
                          ? dinarFormat(payment.total_cod)
                          : payment.total_cod === 0
                          ? '-'
                          : dinarFormat(-payment.total_cod)}
                      </Typography>
                    </TableCell>
                    <TableCell>{payment?.total_packages}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <StatusBadge color={paymentStatus.color} />
                        <Typography
                          variant="inherit"
                          color={paymentStatus.color}
                        >
                          {t(paymentStatus.name.en)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <PaymentMenu
                        paymentid={payment.id}
                        confirmpayment={confirmPayment}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
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
        rowsCount={totalPayments}
      />
    </Box>
  )
}

export default PaymentTable
