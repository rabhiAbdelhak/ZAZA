import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { OrderInfoDialog } from '../../../components/dashboard/order/order-info-dialog'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import { gtm } from '../../../lib/gtm'
import { useRouter } from 'next/router'
import OrderCheckout from '../../../components/dashboard/order/order-checkout'
import OrderStatusInfo from '../../../components/dashboard/order/order-satus-info'
import ErrorComponent from '../../../components/error-component'
import LoadingDetailsComponent from '../../../components/loading-details-component'
import { useTranslation } from 'react-i18next'
import OrderCommentsManage from '../../../components/dashboard/order/order-coments-manage'
import OrderHistory from '../../../components/dashboard/order/order-history'
import {
  useOrderDetailQuery,
  useUpdateOrderMutation,
} from '../../../queries/order'
import OrderDetailsStatusInfo from '../../../components/dashboard/order/order-details-status-info'

const Order = () => {
  const [openInfoDialog, setOpenInfoDialog] = useState(false)

  const router = useRouter()
  const { t } = useTranslation()
  const { orderId } = router.query
  const {
    data: order,
    isLoading,
    error,
    isError,
  } = useOrderDetailQuery(orderId)
  const mutation = useUpdateOrderMutation()

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  function handleUpdate(infoToUpdate, helpers) {
    return toast.promise(
      mutation.mutateAsync({ orderId: order.id, data: infoToUpdate }),
      {
        loading: t('toast.Saving'),
        success: () => {
          helpers.setStatus({ success: true })
          helpers.setSubmitting(false)
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err?.response?.data?.message })
          return err?.response?.data?.message
        },
      },
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDetailsComponent />
    }

    if (isError) {
      return <ErrorComponent message={error?.message} />
    }

    if (order) {
      return (
        <>
          <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid item md={9}>
              <OrderCheckout
                validation={false}
                order={order}
                onUpdate={handleUpdate}
                Editable={false}
              />
            </Grid>
            <Grid item md={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%',
                }}
              >
                <OrderDetailsStatusInfo order={order} />
                <OrderHistory orderid={orderId} />
                <OrderCommentsManage order={order} />
              </Box>
            </Grid>
          </Grid>
          {openInfoDialog && (
            <OrderInfoDialog
              onClose={() => setOpenInfoDialog(false)}
              open={openInfoDialog}
              order={order}
              onUpdate={handleUpdate}
            />
          )}
        </>
      )
    }
  }

  return (
    <>
      <Head>
        <title>{t('orders.Order Details')}</title>
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
              <NextLink href="/dashboard/orders" passHref>
                <Button
                  color="primary"
                  component="a"
                  startIcon={<ArrowLeftIcon />}
                  variant="text"
                >
                  {t('Orders')}
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
                {t('orders.Order Details')}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
          </Box>
          {renderContent()}
        </Container>
      </Box>
    </>
  )
}

Order.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Order
