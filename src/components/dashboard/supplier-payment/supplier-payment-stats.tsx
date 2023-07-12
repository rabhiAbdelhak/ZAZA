import PaymentBox from '@/components/PaymentBox'
import {
  AutoAwesomeRounded,
  CheckCircleRounded,
  GppBadRounded,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Box, BoxProps, useTheme } from '@mui/material'

type SupplierPaymentStateProps = {
  payed?: number
  unpaid?: number
  totalAmount?: number
} & BoxProps

const SupplierPaymentStats = ({
  sx,
  payed = 0,
  unpaid = 0,
  totalAmount = 0,
  ...other
}: SupplierPaymentStateProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      sx={{ display: 'flex', '&>div': { flex: 1 }, gap: 2, ...sx }}
      {...other}
    >
      <PaymentBox
        icon={<GppBadRounded color="inherit" />}
        color={theme.palette.error.main}
        amount={unpaid}
        label={t('delivery.Pending')}
      />
      <PaymentBox
        icon={<CheckCircleRounded color="inherit" />}
        color={theme.palette.success.main}
        amount={payed}
        label={t('delivery.Recieved')}
      />
      <PaymentBox
        icon={<AutoAwesomeRounded color="inherit" />}
        color={theme.palette.info.main}
        amount={totalAmount}
        label={t('delivery.Total')}
      />
    </Box>
  )
}

export default SupplierPaymentStats
