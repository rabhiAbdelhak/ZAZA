import { Box, Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import ErrorComponent from '../../../components/error-component'
import LoadingDetailsComponent from '../../../components/loading-details-component'
import PackageHistory from '../../../components/dashboard/package/package-history'
import PackageCustomerInfo from '../../../components/dashboard/package/package-customer-info'
import PackageOrderInfo from '../../../components/dashboard/package/package-order-info'
import PackageDeliveryInfo from '../../../components/dashboard/package/package-delivery-info'
import PackagePricingDialog from '../../../components/dashboard/package/package-pricing-dialog'
import { usePackageDetailQuery } from '../../../queries/package'

const Package = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { packageId } = router.query
  const [openPricingDialog, setOpenPricingDialog] = useState(false)
  const {
    data: pack,
    isLoading,
    isError,
    error,
  } = usePackageDetailQuery(packageId)

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDetailsComponent />
    }

    if (isError) {
      return <ErrorComponent message={error?.response?.data?.message} />
    }

    if (pack) {
      return (
        <>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid container item md={9} spacing={2}>
              <Grid item md={6}>
                <PackageCustomerInfo pack={pack} />
              </Grid>
              <Grid container item md={6} spacing={2}>
                <Grid item md={12}>
                  <PackageOrderInfo pack={pack} />
                </Grid>
                <Grid item md={12}>
                  <PackageDeliveryInfo pack={pack} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <PackageHistory packid={pack.id} />
            </Grid>
            <PackagePricingDialog
              open={openPricingDialog}
              onClose={() => setOpenPricingDialog(false)}
              pack={pack}
            />
          </Grid>
        </>
      )
    }
  }

  return (
    <>
      <Head>
        <title>{t('Package Details')}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <NextLink href="/dashboard/packages" passHref>
                <Button
                  color="primary"
                  component="a"
                  startIcon={<ArrowLeftIcon />}
                  variant="text"
                >
                  {t('Packages')}
                </Button>
              </NextLink>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography color="textPrimary" variant="h3">
                {t('packages.Package Details')}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                sx={{ color: 'primary.contrast' }}
                size="large"
                color="secondary"
                onClick={() => setOpenPricingDialog(true)}
              >
                {t('packages.Change The Price')}
              </Button>
            </Box>
          </Box>
          {renderContent()}
        </Container>
      </Box>
    </>
  )
}

export default Package

Package.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}
