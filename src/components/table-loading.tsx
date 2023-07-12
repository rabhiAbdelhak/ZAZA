import { Box, Skeleton } from '@mui/material'
import type { BoxProps } from '@mui/system'
import React from 'react'

const TableLoading = ({ sx, ...others }: BoxProps) => {
  return (
    <Box sx={{ p: 2, ...sx }} {...others}>
      <Skeleton height={42} />
      <Skeleton height={42} />
      <Skeleton height={42} />
    </Box>
  )
}

export default TableLoading
