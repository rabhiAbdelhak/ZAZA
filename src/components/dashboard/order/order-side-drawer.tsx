import { Box, Card, Grid, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'

//local imports
import { useDetailsSliding } from '@/hooks/use--details-sliding'
import {
  useOrderDetailQuery,
  useUpdateOrderMutation,
  useUpdateOrderproductsMutation,
} from '@/queries/order'
import LoadingDetailsComponent from '../../loading-details-component'
import OrderCommentsManage from './order-coments-manage'
import { OrderDrawerInfo } from './order-drawer-info'
import OrderDrawerProducts from './order-drawer-products'
import OrderHistory from './order-history'
import OrderDrawerCustomerInfo from './order-drawer-customer-info'
import { Check, Event, HighlightOff, Tag } from '@mui/icons-material'
import { Order } from '@/types/order'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import { BoxProps } from '@mui/system'

type CompProps = {
  anchorLeft: any
  open?: boolean
  onClose: () => void
  orderid: number
  orders: Order[]
  onSelectSingleOrder: (id: number) => void
  sx: BoxProps['sx']
}

type OrderDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps &
  CompProps

const OrderSideDrawer = (props: OrderDrawerProps) => {
  //const {left, top} = anchorLeft.getClientBoundaries()
  const {
    onClose,
    open,
    orderid = 355,
    orders = [],
    sx,
    onSelectSingleOrder,
  } = props
  const ordersIds = orders.map((order: Order) => order.id)
  const [selectedId, handleNext, handlePrevious] = useDetailsSliding(
    ordersIds,
    orderid,
  )

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrderDetailQuery(orderid, { enabled: Boolean(orderid) }) as any
  const { t } = useTranslation()

  useEffect(() => {
    onSelectSingleOrder(selectedId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const mutation = useUpdateOrderMutation(selectedId)

  function handleUpdate(infoToUpdate: any, helpers?: any) {
    const data: any = { orderId: order?.id, data: infoToUpdate }
    return toast.promise(mutation.mutateAsync(data), {
      loading: t('toast.Saving'),
      success: () => {
        helpers?.setStatus({ success: true })
        helpers?.setSubmitting(false)
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        helpers?.setStatus({ success: false })
        helpers?.setErrors({ submit: err?.response?.data?.message })
        return err?.response?.data?.message
      },
    })
  }

  function handleUpdateProducts(infoToUpdate: any, helpers?: any) {
    const data: any = { orderId: order?.id, data: infoToUpdate }
    return toast.promise(mutation.mutateAsync(data), {
      loading: t('toast.Saving'),
      success: () => {
        helpers?.setStatus({ success: true })
        helpers?.setSubmitting(false)
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        helpers?.setStatus({ success: false })
        helpers?.setErrors({ submit: err?.response?.data?.message })
        return err?.response?.data?.message
      },
    })
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDetailsComponent />
    }

    if (order) {
      return (
        <Grid container spacing={4}>
          {/* <Grid item md={12}>
            <OrderStatusInfo order={order} />
          </Grid> */}
          <Grid item md={6}>
            <OrderDrawerCustomerInfo
              order={order}
              onUpdate={handleUpdate}
              Editable={true}
            />
          </Grid>
          <Grid item md={6}>
            <OrderDrawerInfo
              order={order}
              onUpdate={handleUpdate}
              Editable={true}
            />
          </Grid>
          <Grid item md={12}>
            <OrderDrawerProducts
              order={order}
              loading={isLoading}
              onUpdate={handleUpdateProducts}
            />
          </Grid>
          <Grid item md={12}>
            <OrderHistory orderid={orderid} />
          </Grid>
          <Grid item md={12}>
            <OrderCommentsManage order={order} />
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={handleNext}
        onPrev={handlePrevious}
        disabled={isLoading}
        onClose={onClose}
      />
      <Card
        sx={{
          height: 'calc(100% - 100px)',
          p: 2,
          border: 'none',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h4">{t('orders.Order Details')}</Typography>
              {order && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Event sx={{ color: 'text.secondary', width: '22px' }} />
                  {isLoading ? (
                    <Skeleton variant="text" width={80} />
                  ) : (
                    <Typography variant="caption" color="textSecondary" mr={2}>
                      {format(new Date(order?.created_at), 'dd-mm-yyyy hh:mm')}
                    </Typography>
                  )}
                  <Tag sx={{ color: 'text.secondary', width: '22px' }} />
                  {isLoading ? (
                    <Skeleton variant="text" width={50} />
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      {order.order_id}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {renderContent()}
      </Card>
    </InternalDrawer>
  )
}

export default OrderSideDrawer
