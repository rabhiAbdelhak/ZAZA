import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const PackageHistoryBox = ({ history }) => {
  const { from, to, reason, date, color_from, color_to } = history
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="body2" color="textPrimary">
        {t('packages.Order Status changed from')} <strong>{t(from)}</strong>{' '}
        {t('to')} <strong>{to}</strong>
      </Typography>
      {reason && (
        <>
          <Typography variant="caption" color="error">
            Reason : {reason}
          </Typography>
          <br />
        </>
      )}
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
    </Box>
  )
}

export default PackageHistoryBox
