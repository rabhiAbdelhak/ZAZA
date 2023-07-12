import { Box, Card, CardHeader, Typography } from '@mui/material'
import { CardContent } from '@mui/material/node'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useOrderHistoryQuery } from '../../../queries/order'
import OrderHistoryBox from './order-history-box'
import OrderHistoryBoxStatus from './order-history-box-status'
import OrderHistoryBoxUnassigned from './order-history-box-unassigned'

const OrderHistory = ({ orderid }) => {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useOrderHistoryQuery(orderid)
  const histories = useMemo(() => {
    let history = []
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (i + 1 < data.length) {
          history.push({
            from: data[i]?.assigned_user_name,
            status: data[i + 1]?.user?.status_name,
            date: data[i].created_at,
            username: data[i].user?.name,
          })
        }
      }
      return history
    } else {
      return []
    }
  }, [data])

  return (
    <Card>
      <CardHeader
        title={t('History')}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={{ p: 0 }}>
        {data && data.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: 3,
              overflow: 'auto',
              maxHeight: '500px',
              p: 2,
            }}
          >
            {data &&
              data?.map((history, index) => {
                return (
                  <>
                    {history.status_name && (
                      <OrderHistoryBoxStatus
                        key={index + 'hist'}
                        history={history}
                      />
                    )}
                    {history.assigned_user_name && (
                      <OrderHistoryBox key={index + 'hist'} history={history} />
                    )}
                    {history.unassigned_user_name && (
                      <OrderHistoryBoxUnassigned
                        key={index + 'hist'}
                        history={history}
                      />
                    )}
                  </>
                )
              })}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="warning.main">
              The status of this order has never been changed
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default OrderHistory
