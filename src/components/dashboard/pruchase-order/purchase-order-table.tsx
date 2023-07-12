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
import PurchaseOrderValidateDialog from './purchase-order-validate-dialog'

type PurchaseOrderTableProps = {
  selected?: PurchaseOrder
  onSelect?: (supplier: PurchaseOrder) => void
  data?: PurchaseOrder[]
  isLoading?: boolean
  compact?: boolean
  error?: any
  filter?: PurchaseOrderFilter
  onFilter?: (filter: PurchaseOrderFilter) => void
}

function PurchaseOrderTable({
  data = [],
  selected,
  isLoading = false,
  compact = false,
  error,
  onSelect,
  filter,
  onFilter,
}: PurchaseOrderTableProps) {
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !data.length)
  const displayData = Boolean(!isLoading && !error && data.length)
  const [dialogItem, setDialogItem] = useState<PurchaseOrder>()

  const openValidateDialog =
    (item: PurchaseOrder) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setDialogItem(item)
    }

  const closeValidateDialog = () => setDialogItem(undefined)

  return (
    <Card>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Supplier</TableCell>
            {!compact && <TableCell>Tacking code</TableCell>}
            {!compact && <TableCell>Ref</TableCell>}
            {!compact && <TableCell>Date</TableCell>}
            {!compact && <TableCell align="right">Somme</TableCell>}
            <TableCell align="right">Status</TableCell>
            <TableCell align="right" />
          </TableRow>
          <TableRow>
            <TableCell>
              <InputField
                fullWidth
                type="search"
                value={filter?.['filter[supplier_name]'] || ''}
                onChange={(e: any) =>
                  onFilter &&
                  onFilter({
                    ...filter,
                    'filter[supplier_name]': e.target.value,
                  })
                }
                inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                placeholder="Name"
              />
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
            {!compact && (
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
            )}
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
                <TableCell sx={{ py: '2px' }}>
                  <Box display="flex" gap={1} alignItems="center">
                    <CustomAvatar
                      hiddenTooltip
                      src={item?.supplier?.logo}
                      label={item?.supplier?.name}
                      alt={item?.supplier?.name}
                      size={32}
                    />
                    <Typography fontSize="inherit" noWrap color="inherit">
                      {item?.supplier?.name}
                    </Typography>
                  </Box>
                </TableCell>
                {!compact && <TableCell>{item.tracking_code}</TableCell>}
                {!compact && <TableCell>{item.origin}</TableCell>}
                {!compact && (
                  <TableCell>
                    {format(new Date(item.date), 'dd/MM/yyyy')}
                  </TableCell>
                )}
                {!compact && (
                  <TableCell align="right">
                    {dinarFormat(item.total_price)}
                  </TableCell>
                )}
                <TableCell align="right">
                  <ReceiptStatusChip size="small" type={item.state} />
                </TableCell>
                <TableCell align="right">
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

      <PurchaseOrderValidateDialog
        item={dialogItem}
        open={Boolean(dialogItem)}
        onClose={closeValidateDialog}
      />
    </Card>
  )
}

export default PurchaseOrderTable
