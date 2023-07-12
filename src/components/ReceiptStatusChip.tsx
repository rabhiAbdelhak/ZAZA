import { Chip, ChipProps } from '@mui/material'

type ReceiptStatusChipProps = {
  type?: ReceiptStatus
} & Omit<ChipProps, 'label' | 'color'>

const getColorByType = (type?: ReceiptStatus): ChipProps['color'] => {
  switch (type) {
    case 'Validated':
      return 'success'
    case 'Canceled':
      return 'error'
    default:
      return 'default'
  }
}

function ReceiptStatusChip({
  type = 'Draft',
  ...chipProps
}: ReceiptStatusChipProps) {
  return <Chip label={type} color={getColorByType(type)} {...chipProps} />
}

export default ReceiptStatusChip
