import {
  Box,
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { ReactNode } from 'react'

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}))

export type InternalDrawerToolbarProps = {
  onClose?: () => void
  onNext?: () => void
  onPrev?: () => void
  disabled?: boolean
  rightAction?: ReactNode
}

function InternalDrawerListToolbar({
  onClose,
  onNext,
  onPrev,
  disabled = false,
  rightAction,
}: InternalDrawerToolbarProps) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: 'flex',
        gap: 1,
        backgroundColor: 'rgba(255,255,255,0.25)',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        backdropFilter: 'blur(8px)',
        borderTopLeftRadius: '5px',
        color: (theme) => theme.palette.grey[500],
        alignItems: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center">
        <BootstrapTooltip title="close">
          <IconButton
            disabled={disabled}
            onClick={onClose}
            size="small"
            color="inherit"
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </BootstrapTooltip>
        <Box
          sx={{
            width: '1px',
            height: 14,
            mx: 1,
            backgroundColor: (theme) => theme.palette.grey[400],
          }}
        />
        <BootstrapTooltip title="Previous">
          <IconButton
            disabled={disabled}
            onClick={onPrev}
            size="small"
            color="inherit"
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </BootstrapTooltip>
        <BootstrapTooltip title="Next">
          <IconButton
            size="small"
            color="inherit"
            disabled={disabled}
            onClick={onNext}
          >
            <KeyboardArrowUpIcon sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </BootstrapTooltip>
      </Box>
      {rightAction}
    </Box>
  )
}

export default InternalDrawerListToolbar
