import { Scrollbar } from '@/components/scrollbar'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { Pagination } from '@/components/pagination'
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import TableLoading from '@/components/table-loading'
import { format } from 'date-fns'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { MouseEvent, useState } from 'react'

const columns = ['ref', 'date', 'items_count']

type LandingTableProps = {
  items?: PackageImportationList['data']
  page?: number
  totalItems?: number
  pageSize?: number
  isLoading?: boolean
  error?: string
  onPageChange?: (page: number) => void
  onPrint?: (item: PackageImportationListItem) => void
  onShowDetail?: (item: PackageImportationListItem) => void
}

type Menu = {
  anchorEl: HTMLButtonElement
  item: PackageImportationListItem
}

const ImportationTable = (props: LandingTableProps) => {
  const {
    items = [],
    page = 1,
    pageSize,
    isLoading,
    error,
    totalItems = 0,
    onPageChange,
    onPrint,
    onShowDetail,
  } = props
  const { t } = useTranslation()
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !items.length)
  const displayData = Boolean(items.length)

  const [menu, setMenu] = useState<Menu>()

  const handleClose = () => setMenu(undefined)

  const showDetailsHandler =
    (item: PackageImportationListItem) =>
    (event: MouseEvent<HTMLTableRowElement>) => {
      event.stopPropagation()
      if (onShowDetail) {
        onShowDetail(item)
      }
    }

  const handleShowDetail = () => {
    if (!menu || !onShowDetail) {
      handleClose()
      return
    }
    onShowDetail(menu.item)
    handleClose()
  }
  const handlePrint = () => {
    if (!menu || !onPrint) {
      handleClose()
      return
    }
    onPrint(menu.item)
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  <Typography noWrap variant="inherit">
                    {t(`Importation.${column}`)}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          {displayData && (
            <TableBody>
              {items?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ cursor: 'pointer' }}
                  hover
                  onClick={showDetailsHandler(item)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{item.packages_count}</TableCell>
                  <TableCell align="right" sx={{ py: 0 }}>
                    <IconButton
                      aria-label="more menu"
                      edge="end"
                      onClick={(event) => {
                        event.stopPropagation()
                        setMenu({ anchorEl: event.currentTarget, item })
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Scrollbar>
      {displayLoading && <TableLoading />}
      {displayError && (
        <ResourceError error={error} sx={{ flexGrow: 1, m: 2 }} />
      )}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        pageSize={pageSize}
        rowsCount={totalItems}
      />

      <Menu
        anchorEl={menu?.anchorEl}
        open={Boolean(menu)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleShowDetail}>
          {t('Importation.details')}
        </MenuItem>
        <MenuItem onClick={handlePrint}>{t('Importation.print')}</MenuItem>
      </Menu>
    </Box>
  )
}

export default ImportationTable
