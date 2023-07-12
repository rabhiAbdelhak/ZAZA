import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ZimouTimeAgo from '@/components/ZimouTimeAgo'

const OrderHistoryBoxUnassigned = ({ history }) => {
  const { from, status, date } = history
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="body2" color="textPrimary">
        <strong>{history.user?.name}</strong> {t('packages.unassigned')}{' '}
        <strong>{history.unassigned_user_name} </strong>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="textSecondary">
          <strong> {t('Updated')} :</strong> <ZimouTimeAgo date={date} />{' '}
          {t('by')} {history.user?.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderHistoryBoxUnassigned
