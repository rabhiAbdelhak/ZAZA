import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Pagination } from '../pagination'
import { Scrollbar } from '../scrollbar'
import { MapItem } from './SheetMapping'

export type SheetPreviewProps = {
  data: any[]
  mapping: MapItem[]
}

const rowsPerPage = 10
export default function SheetPreview({
  data = [],
  mapping,
}: SheetPreviewProps) {
  const [page, setPage] = useState(1)
  const mappingKeys = useMemo(() => mapping.map((el) => el.field), [mapping])
  const mappingValues = useMemo(
    () => mapping.map((el) => el.mappedFiled),
    [mapping],
  )

  const hasMapValue = !!mappingValues.find((el) => Boolean(el))

  const rows = useMemo(
    () =>
      hasMapValue
        ? data.slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage,
          )
        : [],
    [data, hasMapValue, page],
  )

  return (
    <>
      <Scrollbar
        style={{
          paddingBottom: 8,
          maxHeight: 378,
          height: '100%',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {mappingKeys.map((el) => (
                <TableCell key={el}>
                  <Typography color="inherit" fontSize="inherit">
                    {el}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((el) => (
              <TableRow key={el?.zimouId}>
                {mappingKeys.map((cel, celIndex) => (
                  <TableCell key={cel}>
                    <Typography noWrap color="inherit" fontSize="inherit">
                      {el[mappingValues[celIndex]]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <Pagination
        sx={{ pt: 0 }}
        rowsCount={data.length}
        page={page}
        pageSize={rowsPerPage}
        onPageChange={setPage}
      />
    </>
  )
}
