import { useEffect } from 'react'
import Head from 'next/head'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { InputField } from '../../../components/input-field'
import { OrganizationLayout } from '../../../components/dashboard/organization/organization-layout'
import { gtm } from '../../../lib/gtm'
import { useAuth } from '../../../providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import OrderConfigurations from '../../../components/dashboard/order/order-configurations'

const OrganizationGeneral = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Organization: General</title>
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '20px',
          flexDirection: 'column',
        }}
      >
        <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item md={5} xs={12}>
                <Typography color="textPrimary" variant="h6">
                  {t('organisationPage.Settings')}
                </Typography>
              </Grid>
              <Grid item md={7} xs={12}>
                <InputField
                  disabled
                  fullWidth
                  label={t('form.StoreName')}
                  value={user?.store?.name}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item md={5} xs={12}>
                <Typography color="textPrimary" variant="h6">
                  {t('Orders')}
                </Typography>
              </Grid>
              <Grid item md={7} xs={12}>
                <OrderConfigurations />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

OrganizationGeneral.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <OrganizationLayout>{page}</OrganizationLayout>
    </DashboardLayout>
  </AuthGuard>
)

export default OrganizationGeneral
