import {
  Box,
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
import { format } from 'date-fns'
import { InputField } from '@/components/input-field'
import ReceiptStatusChip from '@/components/ReceiptStatusChip'
import DoneIcon from '@mui/icons-material/Done'
import { MouseEvent, useState } from 'react'
import WarhouseValidateDialog from './warehouse-deletion-dialog'
import { useTranslation } from 'react-i18next'
import Delete from '@mui/icons-material/Delete'

type WarhouseTableProps = {
  selected?: Warhouse
  onSelect?: (enterVoucher: Warhouse) => void
  data?: Warhouse[]
  isLoading?: boolean
  compact?: boolean
  error?: any
  filter?: WarehouseListFilter
  onFilter?: (filter: WarehouseListFilter) => void
}

function WarhouseTable({
  data = [],
  selected,
  isLoading = false,
  compact = false,
  error,
  onSelect,
  filter,
  onFilter,
}: WarhouseTableProps) {
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !data.length)
  const displayData = Boolean(!isLoading && !error && data.length)
  const [dialogItem, setDialogItem] = useState<Warhouse>()
  const { t } = useTranslation()
  const openValidateDialog =
    (item: Warhouse) => (event: MouseEvent<HTMLButtonElement>) => {
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
            <TableCell>{t('Attributes.Name')}</TableCell>
            {<TableCell>{t('Attributes.Location')}</TableCell>}
            {/* {!compact && <TableCell>{t('Attributes.Created')}</TableCell>} */}
            <TableCell align="right" />
          </TableRow>
          <TableRow>
            <TableCell>
              {
                <InputField
                  fullWidth
                  type="search"
                  value={filter?.['filter[name]'] || ''}
                  onChange={(e: any) =>
                    onFilter &&
                    onFilter({
                      ...filter,
                      'filter[name]': e.target.value,
                    })
                  }
                  inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                  placeholder="Name"
                />
              }
            </TableCell>
            <TableCell>
              <InputField
                fullWidth
                type="search"
                value={filter?.['filter[location]'] || ''}
                onChange={(e: any) =>
                  onFilter &&
                  onFilter({
                    ...filter,
                    'filter[location]': e.target.value,
                  })
                }
                inputProps={{ sx: { px: 1, py: 1 / 2 } }}
                placeholder="Location"
              />
            </TableCell>

            {!compact && <TableCell align="right" />}
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
                    <Typography fontSize="inherit" noWrap color="inherit">
                      {item?.name}
                    </Typography>
                  </TableCell>
                }
                {<TableCell>{item.location}</TableCell>}
                {/* {!compact && (
                  <TableCell>
                    {format(new Date(item.created_at), 'dd/MM/yyyy')}
                  </TableCell>
                )} */}

                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Validate" placement="left">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={openValidateDialog(item)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {displayLoading && <TableLoading />}
      {displayError && <ResourceError error={error} sx={{ flexGrow: 1 }} />}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1 }} />}

      <WarhouseValidateDialog
        item={dialogItem}
        open={Boolean(dialogItem)}
        onClose={closeValidateDialog}
      />
    </Card>
  )
}

export default WarhouseTable
