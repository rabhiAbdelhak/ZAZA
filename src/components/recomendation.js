import { Box, Typography } from '@mui/material'

const Recomendation = ({ label, value, Icon, color, bgcolor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        aligItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          bgcolor,
          color,
        }}
      >
        {<Icon />}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color={color}>
          {value}
        </Typography>
        <Typography variant="caption" color={color}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

export default Recomendation
