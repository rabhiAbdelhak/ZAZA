import { Box, Tooltip, Typography } from '@mui/material'
import { StatusBadge } from './status-badge'

type CompProps = {
  name: string
  color: string
}
const StatusChip = (props: CompProps) => {
  const { color, name } = props
  return (
    <Tooltip title={name} arrow>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: '10px',
          width: '130px',
          py: '4px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: '250ms',
          bgcolor: color,
        }}
      >
        <Typography
          noWrap
          variant="subtitle2"
          sx={{ textAlign: 'center' }}
          color="primary.contrast"
        >
          {name}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default StatusChip
