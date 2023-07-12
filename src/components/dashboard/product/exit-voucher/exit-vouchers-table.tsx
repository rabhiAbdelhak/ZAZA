import CustomAvatar from '@/components/CustomAvatar'
import {
  Box,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import TableLoading from '@/components/table-loading'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { dinarFormat } from '@/utils/formats'
import { format } from 'date-fns'
import { InputField } from '@/components/input-field'
import ReceiptStatusChip from '@/components/ReceiptStatusChip'
import DoneIcon from '@mui/icons-material/Done'
import { MouseEvent, useState } from 'react'
import ExitVoucherValidateDialog from './exit-voucher-validation-dialog'
// import ExitVoucherValidateDialog from './purchase-order-validate-dialog'

type ExitVoucherTableProps = {
  selected?: ExitVoucher
  onSelect?: (exitVoucher: ExitVoucher) => void
  data?: ExitVoucher[]
  isLoading?: boolean
  compact?: boolean
  error?: any
  filter?: ExitVoucherFilter
  onFilter?: (filter: ExitVoucherFilter) => void
}

function ExitVoucherTable({
  data = [],
  selected,
  isLoading = false,
  compact = false,
  error,
  onSelect,
  filter,
  onFilter,
}: ExitVoucherTableProps) {
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !data.length)
  const displayData = Boolean(!isLoading && !error && data.length)
  const [dialogItem, setDialogItem] = useState<ExitVoucher>()

  const openValidateDialog =
    (item: ExitVoucher) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      console.log('yes we diid it')
      setDialogItem(item)
    }

  const closeValidateDialog = () => setDialogItem(undefined)

  return (
    <Card>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Warehouse</TableCell>
            {!compact && <TableCell>Tracking code</TableCell>}
            {/* {!compact && <TableCell>Ref</TableCell>} */}
            {!compact && <TableCell>Date</TableCell>}
            {/* {!compact && <TableCell align="right">Somme</TableCell>} */}
            <TableCell align="right">Status</TableCell>
            <TableCell align="right" />
          </TableRow>
          <TableRow>
            <TableCell>
              {
                <InputField
                  fullWidth
                  type="search"
                  value={filter?.['filter[warehouse_name]'] || ''}
                  onChange={(e: any) =>
                    onFilter &&
                    onFilter({
                      ...filter,
                      'filter[warehouse_name]': e.target.value,
                    })
                  }
                  inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                  placeholder="Name"
                />
              }
            </TableCell>
            {!compact && (
              <TableCell>
                <InputField
                  fullWidth
                  inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                  placeholder="tracking"
                  value={filter?.['filter[tracking_code]'] || ''}
                  type="search"
                  onChange={(e: any) =>
                    onFilter &&
                    onFilter({
                      ...filter,
                      'filter[tracking_code]': e.target.value,
                    })
                  }
                />
              </TableCell>
            )}
            {/* {!compact && (
              <TableCell>
                <InputField
                  fullWidth
                  inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                  placeholder="ref"
                  value={filter?.['filter[origin]'] || ''}
                  type="search"
                  onChange={(e: any) =>
                    onFilter &&
                    onFilter({
                      ...filter,
                      'filter[origin]': e.target.value,
                    })
                  }
                />
              </TableCell>
            )} */}
            {!compact && <TableCell />}
            {!compact && <TableCell align="right" />}
            <TableCell />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        {displayData && (
          <TableBody>
            {data.map((item) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                selected={selected?.id === item.id}
                key={item.id}
                onClick={() => onSelect && onSelect(item)}
                hover
              >
                {
                  <TableCell sx={{ py: '2px' }}>
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography fontSize="inherit" noWrap color="inherit">
                        {item?.warehouse_name}
                      </Typography>
                    </Box>
                  </TableCell>
                }
                {!compact && <TableCell>{item.tracking_code}</TableCell>}
                {/* {!compact && <TableCell>{item.origin}</TableCell>} */}
                {!compact && (
                  <TableCell>
                    {format(new Date(item.date), 'dd/MM/yyyy')}
                  </TableCell>
                )}
                <TableCell align="right">
                  <ReceiptStatusChip size="small" type={item.state} />
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  {item?.state === 'Draft' && (
                    <Tooltip title="Validate" placement="left">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={openValidateDialog(item)}
                      >
                        <DoneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {displayLoading && <TableLoading />}
      {displayError && <ResourceError error={error} sx={{ flexGrow: 1 }} />}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1 }} />}

      <ExitVoucherValidateDialog
        item={dialogItem}
        open={Boolean(dialogItem)}
        onClose={closeValidateDialog}
      />
    </Card>
  )
}

export default ExitVoucherTable
