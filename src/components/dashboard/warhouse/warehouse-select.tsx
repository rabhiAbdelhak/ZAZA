import { Scrollbar } from '@/components/scrollbar'
import {
  Box,
  BoxProps,
  ButtonBase,
  Divider,
  IconButton,
  IconButtonProps,
  InputBase,
  List,
  ListItemButton,
  Popover,
  Typography,
} from '@mui/material'
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { useWarehousesQuery } from '@/queries/warehouse'

type WarehouseItemProps = {
  name: string
  onDelete?: IconButtonProps['onClick']
}
function WarehouseItem({ name, onDelete }: WarehouseItemProps) {
  const hasDelete = Boolean(onDelete)
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">{name}</Typography>
      {hasDelete && (
        <IconButton onClick={onDelete} size="small">
          <ClearIcon sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Box>
  )
}

type WarehouseSearchProps = {
  selected?: Warhouse | Warhouse[]
  onSelected?: (warehouse?: Warhouse | Warhouse[]) => void
  multiple?: boolean
  selectedSx?: BoxProps['sx']
}

function WarehouseSearch({
  selected = [],
  onSelected,
  multiple = false,
  selectedSx,
}: WarehouseSearchProps) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const isSelectedAnArray = multiple && Array.isArray(selected)
  const [filter, setFilter] = useState<WarehouseListFilter>({
    'filter[name]': '',
  })

  const { data, isLoading } = useWarehousesQuery(filter)

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setFilter({ 'filter[name]': event.target.value })
    }, 200)
  }

  const selectedIds = useMemo(
    () =>
      Array.isArray(selected)
        ? selected.map((el) => el.id)
        : selected
        ? [selected.id]
        : [],
    [selected],
  )
  const formattedSelected = useMemo(
    () => (Array.isArray(selected) ? selected : selected ? [selected] : []),
    [selected],
  )

  const warehouses = useMemo(
    () => data?.data.filter((el) => !selectedIds.includes(el.id)) || [],
    [data, selectedIds],
  )

  const displayData = Boolean(warehouses.length && !isLoading)
  const displayNoData = Boolean(!warehouses.length && !isLoading)
  const hasSelected = Boolean(formattedSelected.length)

  const handleDelete = (warehouse: Warhouse) => {
    if (!onSelected) {
      return
    }
    if (isSelectedAnArray) {
      onSelected(warehouses.filter((el) => el.id !== warehouse.id))
      return
    }
    onSelected(undefined)
  }

  const handleAdd = (warehouse: Warhouse) => {
    if (!onSelected) {
      return
    }
    if (isSelectedAnArray) {
      onSelected([...selected, warehouse])
      return
    }
    onSelected(warehouse)
  }

  return (
    <Box>
      <InputBase
        onChange={searchHandler}
        autoFocus
        fullWidth
        inputProps={{ sx: { padding: 1, fontSize: 14 } }}
        placeholder="Search a warehouse"
      />
      {hasSelected && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            p: 1,
            bgcolor: (theme: any) => theme.palette.grey['50'],
          }}
        >
          {formattedSelected.map((el) => (
            <WarehouseItem
              key={el.id}
              name={el.name}
              onDelete={() => handleDelete(el)}
            />
          ))}
        </Box>
      )}
      <Divider />
      <Box>
        {isLoading && (
          <Typography variant="body2" color="text.secondary" p={1}>
            Loading...
          </Typography>
        )}
        {displayNoData && (
          <Typography variant="body2" color="text.secondary" p={1}>
            No results
          </Typography>
        )}
        {displayData && (
          <Scrollbar style={{ maxHeight: 200, padding: '8px' }}>
            <List disablePadding>
              {warehouses.map((el) => (
                <ListItemButton dense key={el.id} onClick={() => handleAdd(el)}>
                  <WarehouseItem name={el.name} />
                </ListItemButton>
              ))}
            </List>
          </Scrollbar>
        )}
      </Box>
    </Box>
  )
}

type WarehouseSelectProps = WarehouseSearchProps & {
  onClose?: () => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
}
function WarehouseSelect({
  onClose,
  placeholder,
  disabled = false,
  onSelected,
  multiple,
  error = false,
  ...searchProps
}: WarehouseSelectProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement>()
  const [open, setOpen] = useState(false)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    onClose && onClose()
  }

  const selected = useMemo(
    () =>
      Array.isArray(searchProps.selected)
        ? searchProps.selected
        : searchProps.selected
        ? [searchProps.selected]
        : [],
    [searchProps.selected],
  )

  const handleSelect = (warehouses?: Warhouse | Warhouse[]) => {
    if (onSelected) {
      onSelected(warehouses)
    }
    if (!multiple) {
      setTimeout(() => {
        handleClose()
      }, 50)
    }
  }

  return (
    <>
      <ButtonBase
        disableRipple
        disabled={disabled}
        onClick={handleOpen}
        color={error ? 'error' : undefined}
        sx={{
          width: '100%',
          minHeight: 26,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          px: 0,
          fontSize: 14,
        }}
      >
        {selected.map((el) => (
          <WarehouseItem key={el.id} name={el.name} />
        ))}
        {!selected.length && (
          <Box
            component="span"
            sx={{
              color: (theme) =>
                error ? theme.palette.error.main : theme.palette.grey[500],
            }}
          >
            {placeholder}
          </Box>
        )}
      </ButtonBase>
      <Popover
        open={open && !disabled}
        anchorEl={anchor}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: anchor?.getBoundingClientRect().width,
            minHeight: anchor?.getBoundingClientRect().height,
            overflow: 'hidden',
            borderRadius: 1,
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <WarehouseSearch
          {...searchProps}
          onSelected={handleSelect}
          multiple={multiple}
          selectedSx={{ minHeight: 26 }}
        />
      </Popover>
    </>
  )
}

export default WarehouseSelect
