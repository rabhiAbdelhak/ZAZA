import { CheckCircleOutline } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const PackageSubmited = ({ setIsCreated }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleClick = () => {
    router.push('/dashboard/packages')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          height: 'calc(100vh - 255px)',
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircleOutline
          color="success"
          size="large"
          sx={{ fontSize: '35px' }}
        />
        <Typography variant="h3" color="text.primary">
          {t('packages.Packages submitted')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(
            'packages.You will find your package in the package management page',
          )}
        </Typography>
        <Button style={{ color: 'primary' }} onClick={handleClick}>
          {t('packages.Package Management')}
        </Button>
      </Container>
    </Box>
  )
}

export default PackageSubmited
