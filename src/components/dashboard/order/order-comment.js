import { Box, Typography } from '@mui/material'
import { getElapsedTime } from '../../../utils/elappsed-time'

const OrderComment = ({ user, description, created_at }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '5px',
        p: 2,
      }}
    >
      <Box>
        <Typography variant="h6" color="text.primary">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {getElapsedTime(created_at)}
      </Typography>
    </Box>
  )
}

export default OrderComment
