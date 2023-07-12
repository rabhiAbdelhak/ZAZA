import { Error } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const ErrorComponent = ({ message }) => {
  const router = useRouter()
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
      <Error color="error" sx={{ fontSize: '40px' }} />
      <Typography variant="body2" color="text.secondary">
        {message
          ? message
          : "We don't have a message that describes any type of error! please contact the PM"}
      </Typography>
      <Button variant="text" color="primary" onClick={() => router.reload()}>
        Try Again
      </Button>
    </Box>
  )
}

export default ErrorComponent
