import { useMemo } from 'react'
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Scrollbar } from '../scrollbar'
import { Box } from '@mui/system'

type SheetHeaderSelectionProps = {
  data: any[]
  selectedRow?: number
  onSelectedRow: (row: number) => void
  headers?: string[]
}

export default function SheetHeaderSelection({
  data = [],
  selectedRow = 1,
  onSelectedRow,
  headers = [],
}: SheetHeaderSelectionProps) {
  const rows = useMemo(
    () => data.slice(0, 20).map((el, index) => ({ ...el, iid: index })),
    [data],
  )
  const columns = useMemo(() => headers.slice(0, 5), [headers])
  return (
    <Scrollbar style={{ maxHeight: 380 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            {columns.map((el) => (
              <TableCell key={el}>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((el, index) => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={el.iid}
              selected={selectedRow === index + 1}
              hover
              onClick={() => onSelectedRow(index + 1)}
            >
              <TableCell padding="checkbox">
                <Checkbox size="small" checked={selectedRow === index + 1} />
              </TableCell>

              <TableCell padding="checkbox">{index + 1}</TableCell>

              {columns.map((cl, clIndex) => (
                <TableCell sx={{ maxWidth: 400 }} key={cl}>
                  <Typography color="inherit" noWrap fontSize="inherit">
                    {el[clIndex] || ''}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  )
}
