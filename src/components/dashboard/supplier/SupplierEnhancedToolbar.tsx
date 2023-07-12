import {
  alpha,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

type SupplierEnhancedToolbarProps = {
  numSelected?: number
  onRemove?: () => void
  onAdd?: () => void
  title: string
  disabled?: boolean
  hasAdd?: boolean
}

export default function SupplierEnhancedToolbar(
  props: SupplierEnhancedToolbarProps,
) {
  const {
    numSelected = 0,
    onRemove,
    onAdd,
    title,
    disabled = false,
    hasAdd = true,
  } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onRemove} disabled={disabled}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {!numSelected && hasAdd && (
        <Button onClick={onAdd} startIcon={<AddIcon />} disabled={disabled}>
          Add
        </Button>
      )}
    </Toolbar>
  )
}
