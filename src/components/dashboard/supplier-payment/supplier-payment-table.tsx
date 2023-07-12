import { InputField } from '@/components/input-field'
import ReceiptStatusChip from '@/components/ReceiptStatusChip'
import TableDateFilterButton from '@/components/TableDateFilterButton'
import { dinarFormat } from '@/utils/formats'
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import TableLoading from '@/components/table-loading'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { Pagination } from '@/components/pagination'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import toast from 'react-hot-toast'
import {
  useCancelSupplierPaymentsMutation,
  useValidateSupplierPaymentsMutation,
} from '@/queries/supplier'
import { useTranslation } from 'react-i18next'
import CustomAvatar from '@/components/CustomAvatar'

type SupplierPaymentTableProps = {
  payments?: SupplierPayment[]
  isLoading?: boolean
  filter?: SupplierPaymentsFilter
  onFilter?: (filter: SupplierPaymentsFilter) => void
  page?: number
  pageSize?: number
  rowsCount?: number
  onEdit: (item: SupplierPayment) => void
  withSupplierColumn?: boolean
}

function SupplierPaymentTable({
  payments = [],
  isLoading = false,
  filter,
  onFilter,
  page = 0,
  pageSize = 0,
  rowsCount = 0,
  withSupplierColumn = true,
  onEdit,
}: SupplierPaymentTableProps) {
  const validateMutation = useValidateSupplierPaymentsMutation()
  const cancelMutation = useCancelSupplierPaymentsMutation()
  const { t } = useTranslation()

  const validatePayment = (item: SupplierPayment) => {
    return toast.promise(
      validateMutation.mutateAsync({
        paymentId: item.id,
        supplierId: item.supplier_id,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  const cancelPayment = (item: SupplierPayment) => {
    return toast.promise(
      cancelMutation.mutateAsync({
        paymentId: item.id,
        supplierId: item.supplier_id,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }

  const handleFilter = (data: Partial<SupplierPaymentsFilter>) => {
    if (onFilter) {
      onFilter({ ...filter, ...data, page: 0 })
    }
  }

  const dates = {
    from: filter?.['filter[date_from]'] || '',
    to: filter?.['filter[date_to]'] || '',
  }

  return (
    <>
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {withSupplierColumn && <TableCell>Supplier</TableCell>}
              <TableCell>Reference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow>
              {withSupplierColumn && (
                <TableCell>
                  <InputField
                    inputProps={{ sx: { py: 1 / 2 } }}
                    value={filter?.['filter[supplier_name]']}
                    onChange={(e: any) => {
                      handleFilter({ 'filter[supplier_name]': e.target.value })
                    }}
                    fullWidth
                    placeholder="Search by name"
                    size="small"
                  />
                </TableCell>
              )}
              <TableCell>
                <InputField
                  inputProps={{ sx: { py: 1 / 2 } }}
                  value={filter?.['filter[tracking_code]']}
                  onChange={(e: any) => {
                    handleFilter({ 'filter[tracking_code]': e.target.value })
                  }}
                  fullWidth
                  placeholder="Search by ref"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TableDateFilterButton
                  fullWidth
                  label="Created"
                  size="small"
                  filter={dates}
                  onFilter={(value) =>
                    handleFilter({
                      'filter[date_from]': value.from,
                      'filter[date_to]': value.to,
                    })
                  }
                />
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((el) => (
              <TableRow key={el.id}>
                {withSupplierColumn && (
                  <TableCell>
                    <Box display="flex" gap={1} alignItems="center">
                      <CustomAvatar
                        size={32}
                        avatarSx={{ fontSize: 12 }}
                        label={el.supplier_name}
                      />
                      <Typography noWrap color="inherit" fontSize="inherit">
                        {el.supplier_name}
                      </Typography>
                    </Box>
                  </TableCell>
                )}
                <TableCell>{el.tracking_code}</TableCell>
                <TableCell>{format(new Date(el.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <ReceiptStatusChip size="small" type={el.state} />
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap color="inherit" fontSize="inherit">
                    {dinarFormat(el.amount)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {el.state !== 'Canceled' && (
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      {el.state === 'Draft' && (
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => onEdit(el)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {el.state === 'Draft' && (
                        <Tooltip title="Validate">
                          <IconButton
                            size="small"
                            disabled={validateMutation.isLoading}
                            onClick={() => validatePayment(el)}
                          >
                            <DoneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {el.state === 'Validated' && (
                        <Tooltip title="Cancel">
                          <IconButton
                            size="small"
                            disabled={cancelMutation.isLoading}
                            onClick={() => cancelPayment(el)}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <TableLoading />}
        {!isLoading && !payments.length && (
          <ResourceUnavailable sx={{ flexGrow: 1 }} />
        )}
        {!!payments.length && (
          <Pagination
            sx={{ pb: 0 }}
            onPageChange={(p) => onFilter && onFilter({ ...filter, page: p })}
            page={page}
            pageSize={pageSize}
            rowsCount={rowsCount}
          />
        )}
      </TableContainer>
    </>
  )
}

export default SupplierPaymentTable
