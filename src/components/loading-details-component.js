import { Box, Skeleton } from '@mui/material'

const LoadingDetailsComponent = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Skeleton height={42} />
      <Skeleton />
      <Skeleton />
    </Box>
  )
}

export default LoadingDetailsComponent
