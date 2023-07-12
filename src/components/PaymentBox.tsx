import { dinarFormat } from '@/utils/formats'
import { alpha, Box, BoxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

type PaymentBoxProps = {
  color: string
  icon: ReactNode
  label: string
  amount: number
} & BoxProps

const PaymentBox = ({
  color,
  icon,
  amount,
  label,
  sx,
  ...boxProps
}: PaymentBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 1,
        borderRadius: 1,
        ...sx,
      }}
      {...boxProps}
    >
      <Box
        sx={{
          height: '48px',
          width: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor: alpha(color, 0.2),
          color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="h6" color={color}>
          {dinarFormat(amount)}
        </Typography>
      </Box>
    </Box>
  )
}

export default PaymentBox
