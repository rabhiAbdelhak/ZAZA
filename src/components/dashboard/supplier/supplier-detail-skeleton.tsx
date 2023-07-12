import { Box, Skeleton } from '@mui/material'

function SupplierDetailSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton
          variant="circular"
          sx={{ width: 70, height: 70, borderRadius: '50%' }}
        />
        <Box flexGrow={1} maxWidth={300}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </Box>

      <Box display="flex" gap={4}>
        <Skeleton variant="rectangular" sx={{ flex: 2, height: 100 }} />
        <Skeleton variant="rectangular" sx={{ flex: 1, height: 100 }} />
      </Box>

      <Skeleton variant="rectangular" sx={{ height: 100 }} />
    </Box>
  )
}

export default SupplierDetailSkeleton
