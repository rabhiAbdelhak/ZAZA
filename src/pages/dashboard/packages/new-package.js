import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import PackageCreationForm from '../../../components/dashboard/package/package-createion-form'
import PackageSubmited from '../../../components/dashboard/package/package-submited'

const NewPackage = () => {
  const [isCreated, setIsCreated] = useState(false)
  const { t } = useTranslation()

  if (isCreated) {
    return <PackageSubmited setIsCreated={setIsCreated} />
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>
        <Button
          size="small"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ border: 0, minHeight: 0, minWidth: 0, pl: 0, mt: 5 }}
          onClick={() => router.back()}
        >
          {t('Back')}
        </Button>
        <Typography variant="h4" my={4}>
          {t('packages.New Package')}
        </Typography>
        <PackageCreationForm setIsCreated={setIsCreated} />
      </Container>
    </Box>
  )
}

export default NewPackage

NewPackage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)
