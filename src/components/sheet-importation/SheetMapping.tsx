import { Box, MenuItem, Typography } from '@mui/material'
import { InputField } from '../input-field'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { BoxProps } from '@mui/system'
import { Scrollbar } from '../scrollbar'

export type MapInnerItem = {
  field: string
  mappedFiled: string
  required: boolean
}

export type SheetMappingProps = {
  headers?: string[]
  mapping: MapInnerItem[]
  onMap: (mapping: MapInnerItem[]) => void
} & BoxProps

export default function SheetMapping({
  headers = [],
  mapping = [],
  onMap,
  ...otherProps
}: SheetMappingProps) {
  const mapHandler = (columnItem: string, headerItem = '') => {
    const newMapping: MapInnerItem[] = mapping.map((el) =>
      el.field === columnItem
        ? { ...el, field: columnItem, mappedFiled: headerItem }
        : el,
    )
    onMap(newMapping)
  }

  return (
    <Scrollbar
      style={{
        maxHeight: 370,
        padding: '0 16px 16px 0',
      }}
    >
      <Box display="flex" gap={2} {...otherProps}>
        <Box display="flex" flexDirection="column" gap={2} flex={1}>
          <Typography noWrap variant="subtitle2">
            Column
          </Typography>
          {mapping.map((el) => (
            <InputField
              fullWidth
              sx={{ maxWidth: 200 }}
              key={el.field}
              value={el.required ? `${el.field} *` : el.field}
              disabled
            />
          ))}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ marginTop: 5 }}
        >
          {mapping.map((el) => (
            <Box
              key={el.field}
              height={36.4}
              display={'flex'}
              alignItems="center"
            >
              <ArrowForwardIcon color="action" fontSize="small" />
            </Box>
          ))}
        </Box>
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <Typography noWrap variant="subtitle2">
            Custom column
          </Typography>
          {mapping.map((el) => (
            <InputField
              select
              key={el.field}
              sx={{ maxWidth: 200 }}
              value={el.mappedFiled}
              onChange={(event: any) =>
                mapHandler(el.field, event?.target?.value)
              }
            >
              {headers.map((h) => (
                <MenuItem dense value={h} key={h}>
                  {h}
                </MenuItem>
              ))}
            </InputField>
          ))}
        </Box>
      </Box>
    </Scrollbar>
  )
}
