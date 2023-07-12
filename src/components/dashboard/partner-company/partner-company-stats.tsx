import PaymentBox from '@/components/PaymentBox'
import {
  AutoAwesomeRounded,
  CheckCircleRounded,
  GppBadRounded,
} from '@mui/icons-material'
import { Box, BoxProps, useTheme } from '@mui/material'

type SupplierPaymentStateProps = {
  payed?: number
  unpaid?: number
  totalAmount?: number
} & BoxProps

const PartnerPaymentStats = ({
  sx,
  payed = 0,
  unpaid = 0,
  totalAmount = 0,
  ...other
}: SupplierPaymentStateProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{ display: 'flex', '&>div': { flex: 1 }, gap: 2, ...sx }}
      {...other}
    >
      <PaymentBox
        icon={<GppBadRounded color="inherit" />}
        color={theme.palette.error.main}
        amount={unpaid}
        label="Unpaid"
      />
      <PaymentBox
        icon={<CheckCircleRounded color="inherit" />}
        color={theme.palette.success.main}
        amount={payed}
        label="Payed"
      />
      <PaymentBox
        icon={<AutoAwesomeRounded color="inherit" />}
        color={theme.palette.info.main}
        amount={totalAmount}
        label="Amount"
      />
    </Box>
  )
}

export default PartnerPaymentStats
