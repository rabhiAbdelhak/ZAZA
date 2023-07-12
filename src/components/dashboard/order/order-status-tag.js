import { usePopover } from '@/hooks/use-popover'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import StatusPoper from './order-status-poper'

//local import
import { useSettingsQuery } from '../../../queries/settings'

const OrderStatusTag = (props) => {
  const { statusIsPoper, order, statusVariant, disabled } = props
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const { t } = useTranslation()
  const { data: settings, isLoading } = useSettingsQuery()
  const currentConfigValue =
    settings?.find((set) => set.key === 'order_package_auto_creation') || 2

  return (
    <>
      <StatusPoper
        key={currentConfigValue}
        anchorEl={anchorRef.current}
        settings={settings}
        open={open}
        handleClose={handleClose}
        orderid={order?.id}
        currentStatus={order?.status}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: '10px',
          width: '130px',
          py: '3px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: '250ms',
          bgcolor: statusVariant?.color,
          opacity: disabled ? '0.6' : 1,
          '&:hover': {
            bgcolor: statusVariant?.color,
            color: 'primary.contrast',
          },
          '&:hover .badge': {
            bgcolor: 'white',
          },
        }}
        ref={anchorRef}
        onClick={(e) => {
          e.stopPropagation()
          if (disabled) return
          handleOpen()
        }}
      >
        <Typography noWrap variant="subtitle2" color="inherit">
          {order.status < 3 ? t(statusVariant?.name) : t(order.status_name)}
        </Typography>
      </Box>
    </>
  )
}

export default OrderStatusTag
