import { Box, Skeleton } from '@mui/material'
import React from 'react'

const TableLoading = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton height={42} />
      <Skeleton height={42} />
      <Skeleton height={42} />
    </Box>
  )
}

export default TableLoading
