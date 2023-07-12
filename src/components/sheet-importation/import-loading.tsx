import { CircularProgress, Box, Typography } from '@mui/material'
import React from 'react'

const ImportLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle2" color="textSecondary">
        Sending Data
      </Typography>
      <CircularProgress color="secondary" />
    </Box>
  )
}

export default ImportLoading
