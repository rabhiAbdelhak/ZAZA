import { Box, Skeleton } from '@mui/material'
import React from 'react'

const PartnerCompanyDetailsSkelton = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" gap={10}>
        <Box flex={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
        <Box flex={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </Box>

      <Box display="flex" gap={4}>
        <Skeleton variant="rectangular" sx={{ flex: 1, height: 100 }} />
      </Box>
    </Box>
  )
}

export default PartnerCompanyDetailsSkelton
