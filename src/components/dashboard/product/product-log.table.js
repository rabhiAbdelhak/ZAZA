import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ResourceUnavailable } from '../../resource-unavailable'
import { Scrollbar } from '../../scrollbar'
import { useTranslation } from 'react-i18next'

function ProductLogTable({ logs = [], reference }) {
  const { t } = useTranslation()

  const columns = [
    { id: 'reference', label: t('storageLog.Reference') },
    { id: 'initialState', label: t('storageLog.InitialState'), align: 'right' },
    { id: 'intoStorage', label: t('storageLog.IntoStorage'), align: 'right' },
    { id: 'outStorage', label: t('storageLog.OutStorage'), align: 'right' },
    { id: 'event', label: t('storageLog.Event') },
    { id: 'finalState', label: t('storageLog.FinalState'), align: 'right' },
    { id: 'date', label: t('storageLog.Date') },
  ]

  const onPageChange = () => {}

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
                  <Typography noWrap variant="caption">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {logs.map((log) => {
              return (
                <TableRow hover key={log.id}>
                  <TableCell>{reference}</TableCell>
                  <TableCell align="right">{log.quantity}</TableCell>
                  <TableCell align="right">{log.quantity_in}</TableCell>
                  <TableCell align="right">{log.quantity_out}</TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell align="right">{log.quantity_end}</TableCell>
                  <TableCell padding="checkbox" sx={{ px: 2 }}>
                    <Typography variant="body2">
                      {format(new Date(log.created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2">
                      {format(new Date(log.created_at), 'hh:mm')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>

      {!logs.length && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}
    </Box>
  )
}

ProductLogTable.propTypes = {
  logs: PropTypes.array,
  reference: PropTypes.string,
}

export default ProductLogTable
