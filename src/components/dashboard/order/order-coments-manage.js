import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobaleDispatchContext } from '../../../contexts/global context/Provider'
import { useGetOrderComments } from '../../../queries/order'
import LoadingDetailsComponent from '../../loading-details-component'
import OrderComment from './order-comment'
import OrderCommentForm from './order-comment-form'

const OrderCommentsManage = ({ order }) => {
  const { orderDispatch: dispatch } = useGlobaleDispatchContext()

  const {
    data: orderComments,
    isLoading,
    isError,
    error,
  } = useGetOrderComments(order.id)
  const { t } = useTranslation()

  return (
    <Card sx={{ mt: 2, flex: 1 }}>
      <CardHeader
        title={t('orders.Comments')}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <OrderCommentForm orderId={order.id} />
        <Box
          sx={{
            minHeight: '100px',
            overflow: 'auto',
            border: 0,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {!isLoading ? (
            orderComments.map((comment) => {
              return <OrderComment key={comment.id} {...comment} />
            })
          ) : (
            <LoadingDetailsComponent />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default OrderCommentsManage
