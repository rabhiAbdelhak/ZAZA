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

type ExitVoucherToolbarProps = {
  numSelected?: number
  onRemove?: () => void
  disabled?: boolean
  error?: boolean
}

export default function ExitVoucherToolbar(props: ExitVoucherToolbarProps) {
  const { numSelected = 0, onRemove, disabled = false, error } = props

  return (
    <Toolbar
      disableGutters
      sx={{
        pl: 0,
        pr: { xs: 1, sm: 1 },
        minHeight: '48px !important',
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
          sx={{ flex: '1' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1' }}
          variant="h6"
          id="tableTitle"
          component="div"
          color={error ? 'error' : undefined}
        >
          Products
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onRemove} disabled={disabled}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}
