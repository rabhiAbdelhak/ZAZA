import { CircularProgress, Container, Box } from '@mui/material'

const LoadingPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ margin: '30px auto' }} color="secondary" />
      </Container>
    </Box>
  )
}

export default LoadingPage
