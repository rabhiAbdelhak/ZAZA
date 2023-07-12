import { Event, Tag } from '@mui/icons-material'
import { Box, Drawer, Grid, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

//local imports
import LoadingDetailsComponent from '../../loading-details-component'
import OrderCommentsManage from './order-coments-manage'
import { OrderDrawerInfo } from './order-drawer-info'
import OredrDrawerProduct from './order-drawer-products'
import DrawerToolbar from '../../drawer-toolbar'
import { useDetailsSliding } from '../../../hooks/use--details-sliding'
import {
  useOrderDetailQuery,
  useUpdateOrderMutation,
} from '../../../queries/order'
import toast from 'react-hot-toast'
import OrderHistory from './order-history'
import OrderDrawerCustomerInfo from './order-drawer-customer-info'

const OrderDrawer = (props) => {
  const { onClose, open, orderid, orders, onSelectSingleOrder } = props
  const ordersIds = orders.map((order) => order.id)
  const [drawerWidth, setDrawerWidth] = useState(920)
  const [selectedId, handleNext, handlePrevious] = useDetailsSliding(
    ordersIds,
    orderid,
  )
  const [resizerRef, setResizerRef] = useState(null)
  const [commentsRef, setCommentsRef] = useState(null)
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrderDetailQuery(selectedId)
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    onSelectSingleOrder(selectedId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const scrollToComments = () => {
    commentsRef?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleClickFull = () => {
    if (selectedId) {
      router.push(`/dashboard/orders/${selectedId}`)
    }
  }
  const mutation = useUpdateOrderMutation()
  function handleUpdate(infoToUpdate) {
    return toast.promise(
      mutation.mutateAsync({ orderId: order.id, data: infoToUpdate }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          return err?.response?.data?.message
        },
      },
    )
  }

  useEffect(() => {
    let x = 0

    const handleMouseDown = (event) => {
      event.stopPropagation()
      x = event.clientX
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (event) => {
      const dx = event.clientX - x
      x = event.clientX
      setDrawerWidth((prevWidth) => {
        const newWidth = prevWidth - dx
        const screenWidth = window.innerWidth
        return newWidth > 920 && newWidth < screenWidth
          ? newWidth
          : newWidth > screenWidth
          ? screenWidth
          : prevWidth
      })
    }

    const handleMouseUp = (event) => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    const resizer = resizerRef
    if (resizer) {
      resizer.addEventListener('mousedown', handleMouseDown)
    }
    return () => {
      if (resizer) {
        resizer.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [resizerRef])

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
          <Grid item md={drawerWidth < 860 ? 12 : 6}>
            <OrderDrawerCustomerInfo
              order={order}
              key={selectedId}
              onUpdate={handleUpdate}
              Editable={true}
            />
          </Grid>
          <Grid item md={drawerWidth < 860 ? 12 : 6}>
            <OrderDrawerInfo
              order={order}
              onUpdate={handleUpdate}
              Editable={true}
            />
          </Grid>
          <Grid item md={12}>
            <OredrDrawerProduct order={order} loading={isLoading} />
          </Grid>
          <Grid item md={12}>
            <OrderHistory orderid={orderid} />
          </Grid>
          <Grid item md={12}>
            <OrderCommentsManage order={order} reference={setCommentsRef} />
          </Grid>
        </Grid>
      )
    }
  }
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => onClose?.()}
      hideBackdrop={true}
      PaperProps={{
        sx: {
          p: '0 15px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: `${drawerWidth}px`,
          overlow: 'auto',
          minWidth: '920px',
        },
      }}
    >
      <div
        ref={setResizerRef}
        style={{
          position: 'fixed',
          height: '100%',
          width: '4px',
          backgroundColor: 'rgb(0 0 0 / 0.02)',
          top: 0,
          right: drawerWidth > 920 ? `${drawerWidth}px` : '920px',
          background: 'white',
          cursor: 'col-resize',
        }}
      ></div>
      <DrawerToolbar
        isLoading={isLoading}
        onClickNext={handleNext}
        onClickPrevious={handlePrevious}
        onClickFull={handleClickFull}
        onClose={onClose}
        scrollToComments={scrollToComments}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
                  {format(new Date(order.created_at), 'dd-mm-yyyy hh:mm')}
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
      {renderContent()}
    </Drawer>
  )
}

export default OrderDrawer
