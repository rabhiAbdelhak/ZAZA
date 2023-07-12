import { Box, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../../utils/formats'

const PaymentAgregationBox = ({
  isLoading,
  label,
  icon: Icon,
  value,
  bgcolor,
  color,
}) => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        borderRadius: 1,
        minWidth: '30%',
      }}
    >
      <Box
        sx={{
          height: '50px',
          width: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor,
        }}
      >
        <Icon color={color} sx={{ color }} />
      </Box>
      <Box>
        <Typography variant="body2">{t('payments.' + label)}</Typography>
        <Typography variant="h6" color={color}>
          {dinarFormat(value)}
        </Typography>
      </Box>
    </Box>
  )
}

export default PaymentAgregationBox
