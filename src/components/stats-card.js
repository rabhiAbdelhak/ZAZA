import { alpha, Box, Card, CardContent, Typography } from '@mui/material'
import PropTypes, { string } from 'prop-types'

function StatsCard({
  color = '#000',
  title = '',
  subTitle = '',
  icon: Icon,
  ...props
}) {
  return (
    <Card
      sx={{ display: 'flex', gap: 1, alignItems: 'center', padding: 1 }}
      {...props}
    >
      {Boolean(Icon) && (
        <Box
          sx={{
            bgcolor: alpha(color, 0.1),
            height: 32,
            width: 32,
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Icon sx={{ color, fontSize: 16 }} />
        </Box>
      )}

      <Box display="flex" flexDirection="column">
        <Typography
          noWrap
          variant="caption"
          sx={{ textTransform: 'uppercase', fontSize: 11 }}
        >
          {title}
        </Typography>
        <Typography noWrap variant="caption" sx={{ color, fontWeight: 500 }}>
          {subTitle}
        </Typography>
      </Box>
    </Card>
  )
}

StatsCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.elementType,
}

export default StatsCard
