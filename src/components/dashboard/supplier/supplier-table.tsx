import CustomAvatar from '@/components/CustomAvatar'
import {
  Box,
  Card,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import TableLoading from '@/components/table-loading'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import DeleteSupplierDialog from './delete-supplier-dialog'

type SupplierTableProps = {
  selectedSupplier?: Supplier
  onSelectSupplier?: (supplier: Supplier) => void
  data?: Supplier[]
  compact?: boolean
  isLoading?: boolean
  error?: any
}

function SupplierTable({
  data = [],
  selectedSupplier,
  compact = false,
  isLoading = false,
  error,
  onSelectSupplier,
}: SupplierTableProps) {
  const anchorClickHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const [selectedItem, setSelectedItem] = useState<Supplier>()
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const onRemove =
    (item: Supplier) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setSelectedItem(item)
      setOpen(true)
    }

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !data.length)
  const displayData = Boolean(!isLoading && !error && data.length)

  return (
    <Card>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {!compact && <TableCell>Website</TableCell>}
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        {displayData && (
          <TableBody>
            {data.map((supplier) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                selected={selectedSupplier?.id === supplier.id}
                key={supplier.id}
                onClick={() => onSelectSupplier && onSelectSupplier(supplier)}
                hover
              >
                <TableCell sx={{ py: 0 }}>
                  <Box display="flex" gap={1} alignItems="center">
                    <CustomAvatar
                      hiddenTooltip
                      src={supplier.logo}
                      label={supplier.name}
                      size={32}
                    />
                    <Typography fontSize="inherit" noWrap color="inherit">
                      {supplier.name}
                    </Typography>
                  </Box>
                </TableCell>
                {!compact && (
                  <TableCell sx={{ py: 0 }}>
                    <Link
                      target="_blank"
                      href={supplier.website}
                      noWrap
                      color="inherit"
                      fontSize="inherit"
                      underline="hover"
                      onClick={anchorClickHandler}
                    >
                      {supplier.website}
                    </Link>
                  </TableCell>
                )}
                <TableCell sx={{ py: 0 }} align="right">
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={onRemove(supplier)}
                    >
                      <DeleteIcon />
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

      <DeleteSupplierDialog
        open={open}
        supplier={selectedItem}
        onClose={handleClose}
        onSuccess={handleClose}
      />
    </Card>
  )
}

export default SupplierTable
