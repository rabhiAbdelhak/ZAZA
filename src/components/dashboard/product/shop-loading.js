import { Box, Grid, Skeleton } from '@mui/material'

const ShopLoading = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={3}>
        <Box sx={{ my: 4 }}>
          <Skeleton width={200} />
          <Box
            sx={{
              pl: 1,
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Skeleton width={140} />
            <Skeleton width={140} />
            <Skeleton width={140} />
            <Skeleton width={140} />
            <Skeleton width={140} />
          </Box>
        </Box>
      </Grid>
      <Grid item md={9}>
        {[1, 2, 3].map((index) => {
          return (
            <Box sx={{ my: 4 }} key={index}>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={40} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {[1, 2, 3, 4, 5].map((pr) => {
                  return (
                    <Box key={pr}>
                      <Skeleton
                        variant="avatar"
                        width={170}
                        height={140}
                        sx={{ borderRadius: '15px' }}
                      />
                      <Skeleton variant="text" width={170} />
                      <Skeleton variant="text" width={100} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default ShopLoading
