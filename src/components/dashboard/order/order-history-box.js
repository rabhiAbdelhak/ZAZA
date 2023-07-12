import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import ZimouTimeAgo from '@/components/ZimouTimeAgo'

const OrderHistoryBox = ({ history }) => {
  const { from, status, date, reason, username } = history
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="body2" color="textPrimary">
        <strong>{history.user?.name}</strong> {t('packages.assigned')}{' '}
        <strong>{history.assigned_user_name} </strong>
      </Typography>
      {/* {reason && (
        <>
          <Typography variant="caption" color="error">
            {t('Reason')} : {reason}
          </Typography>
          <br />
        </>
      )} */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="textSecondary">
          <strong> {t('Updated')} :</strong> <ZimouTimeAgo date={date} />{' '}
          {t('by')} {history.user?.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderHistoryBox
