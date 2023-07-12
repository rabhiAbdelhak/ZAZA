import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ZimouTimeAgo from '@/components/ZimouTimeAgo'
import { statusList } from '@/constants/order-statuses'
const OrderHistoryBoxStatus = ({ history }) => {
  const { t } = useTranslation()
  const status =
    statusList.find((s) => {
      return s.id === history.status
    })?.name || history.status_name

  return (
    <Box>
      <Typography variant="body2" color="textPrimary">
        {t('packages.Order Status changed')} <strong>{t(status)}</strong>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="textSecondary">
          <strong> {t('Updated')} :</strong>{' '}
          <ZimouTimeAgo date={history?.created_at} /> {t('by')}{' '}
          {history?.user?.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderHistoryBoxStatus
