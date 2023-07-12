import { ContentCopy } from '@mui/icons-material'
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
  IconButton,
  Chip,
  TableContainer,
} from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useTranslation } from 'react-i18next'
import { Pagination } from '../../pagination'
import { ResourceError } from '../../resource-error'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import TableLoading from '../table-loading'
import PackageMenu from './package-menu'
import InputFieldFilter from '../../input-field-filter'
import PaiementStatusAutocomplete from './PaiementStatusAutocomplete'
import WilayaAutocomplete from '../../WilayaAutocomplete'
import DeliveryTypesAutocomplete from './DeliveryTypesAutocomplete'
import StatusChip from '../../status-chip'

const columns = [
  {
    id: 'tracking_code',
    label: 'Tracking code',
  },
  {
    id: 'status_name',
    label: 'Status',
  },
  {
    id: 'product',
    label: 'Product',
  },
  {
    id: 'client',
    label: 'Customer',
  },
  {
    id: 'client_phone',
    label: 'Phone Number',
  },
  {
    id: 'state',
    label: 'State',
  },
  {
    id: 'delivery_type',
    label: 'Delivery Type',
  },
  {
    id: 'store_payment_status_name',
    label: 'Payment Status',
  },
]

const PackagesTable = (props) => {
  const {
    error,
    isLoading,
    paymentStatusVariants,
    SetSingleSelectedPackageId,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    packages,
    totalPackages,
    page,
    selectedPackages,
    openDrawer,
    sort,
    sortBy,
    pageSize,
    situationsVariant,
    statusVariants,
    onPrint,
    filter,
    onFilter,
    onOpenDrawer,
  } = props
  const { t } = useTranslation()
  const router = useRouter()
  const displayLoading = Boolean(isLoading && !error)
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !packages.length)
  const displayData = Boolean(!isLoading && !error && packages)

  const handleFilter = (newFilter) => {
    if (onFilter) {
      onFilter({ ...filter, ...newFilter, page: 0 })
    }
  }

  const handleSinglePackageSelection = (id) => {
    SetSingleSelectedPackageId(id)
    onOpenDrawer()
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
      <TableContainer
        sx={{ minWidth: openDrawer ? '500px' : 1000, maxHeight: '500px' }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ bgcolor: 'neutral.50' }}>
                <Checkbox
                  checked={
                    packages?.length > 0 &&
                    selectedPackages?.length === packages?.length
                  }
                  disabled={isLoading}
                  indeterminate={
                    selectedPackages?.length > 0 &&
                    selectedPackages?.length < packages?.length
                  }
                  onChange={onSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ bgcolor: 'neutral.50' }}>
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
            <TableRow>
              <TableCell />
              <TableCell sx={{ py: 1 }}>
                <InputFieldFilter
                  placeholder={`${t('Attributes.Tracking code')}`}
                  fullWidth
                  value={filter?.trackingCode}
                  onChange={(event) =>
                    handleFilter({ trackingCode: event.target.value })
                  }
                  onClear={() => handleFilter({ trackingCode: '' })}
                />
              </TableCell>
              <TableCell />
              <TableCell sx={{ py: 1 }}>
                <InputFieldFilter
                  placeholder={`${t('Attributes.Product')}`}
                  fullWidth
                  value={filter?.productName}
                  onChange={(event) =>
                    handleFilter({ productName: event.target.value })
                  }
                  onClear={() => handleFilter({ productName: '' })}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <InputFieldFilter
                  placeholder={`${t('Attributes.Customer')}`}
                  fullWidth
                  value={filter?.clientName}
                  onChange={(event) =>
                    handleFilter({ clientName: event.target.value })
                  }
                  onClear={() => handleFilter({ clientName: '' })}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <InputFieldFilter
                  placeholder={`${t('Attributes.Phone Number')}`}
                  fullWidth
                  value={filter?.clientPhone}
                  onChange={(event) =>
                    handleFilter({ clientPhone: event.target.value })
                  }
                  onClear={() => handleFilter({ clientPhone: '' })}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <WilayaAutocomplete
                  placeholder={t('Attributes.State')}
                  label={null}
                  fullWidth
                  filter={filter}
                  value={filter?.wilaya}
                  onChange={(e, value) => {
                    handleFilter({ wilaya: value })
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 1, minWidth: 220 }}>
                <DeliveryTypesAutocomplete
                  value={filter?.deliveryType}
                  filter={filter}
                  onChange={(e, value) => handleFilter({ deliveryType: value })}
                />
              </TableCell>
              <TableCell sx={{ py: 1, minWidth: 250 }}>
                <PaiementStatusAutocomplete
                  value={filter?.paymentStatus}
                  onChange={(e, value) =>
                    handleFilter({ paymentStatus: value })
                  }
                />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          {displayData && (
            <TableBody>
              {packages?.map((pack) => {
                const situationVariant = situationsVariant.find((situation) => {
                  return situation.statusIds.includes(pack.status_id)
                })
                const statusVariant = statusVariants.find(
                  (status) => status.id === pack.status_id,
                )
                const paymentStatus = paymentStatusVariants.find((status) => {
                  return Boolean(
                    status.name.fr === pack.store_payment_status_name,
                  )
                })

                return (
                  <TableRow
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleSinglePackageSelection(pack.id)}
                    key={pack.id}
                    selected={
                      !!selectedPackages?.find(
                        (selectedPackage) => selectedPackage === pack.id,
                      )
                    }
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={
                          !!selectedPackages?.find(
                            (selectedPackage) => selectedPackage === pack.id,
                          )
                        }
                        onChange={(event) => onSelect(event, pack.id)}
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
                          py: 1,
                          px: 2,
                        }}
                      >
                        <NextLink
                          href={'/dashboard/packages/' + pack.id}
                          passHref
                        >
                          <Link
                            color="inherit"
                            component="a"
                            underline="none"
                            variant="subtitle2"
                          >
                            <Typography
                              noWrap
                              color="inherit"
                              variant="inherit"
                            >
                              {pack.tracking_code}
                            </Typography>
                          </Link>
                        </NextLink>
                        <IconButton
                          sx={{ minWidth: 0, minHeight: 0, p: '3px' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard
                              .writeText(pack.tracking_code)
                              .then((data) => {
                                toast.success(
                                  'Text Copied : ' + pack.tracking_code,
                                )
                              })
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '18px' }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        color={statusVariant?.color}
                        name={statusVariant?.name?.en}
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }} title={pack?.name}>
                      <Typography noWrap color="inherit" variant="inherit">
                        {`${pack.name}`}
                      </Typography>
                    </TableCell>
                    <TableCell
                      title={pack.client_first_name}
                      sx={{ maxWidth: '220px' }}
                    >
                      <Typography noWrap variant="inherit">
                        {pack.client_first_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        component={Link}
                        href={`tel:${pack.client_phone}`}
                        size="small"
                        icon={<LocalPhoneIcon sx={{ fontSize: 18 }} />}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ color: 'text.primary' }}
                        label={pack.client_phone}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography noWrap color="inherit" variant="inherit">
                        {`${pack.commune?.name} ${pack.commune?.wilaya?.name}`}
                      </Typography>
                      <Typography color="textSecondary" variant="inherit">
                        {pack.courier}
                      </Typography>
                    </TableCell>
                    <TableCell>{pack.delivery_type}</TableCell>
                    <TableCell>
                      <StatusChip
                        color={paymentStatus?.color}
                        name={paymentStatus?.name?.en}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PackageMenu onPrint={onPrint} packid={pack.id} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
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
        rowsCount={totalPackages}
      />
    </Box>
  )
}

export default PackagesTable
