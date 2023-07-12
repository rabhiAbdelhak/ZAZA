import { Search } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFoundAfterSearching = ({ message, item }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 10,
      }}
    >
      <Search sx={{ color: 'text.primary', fontSize: '35px' }} />
      <Typography variant="h2" color="text.primary">
        {message}
      </Typography>
    </Box>
  )
}

export default NotFoundAfterSearching
