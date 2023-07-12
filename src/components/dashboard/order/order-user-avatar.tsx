import AssignToUserPopper from '@/components/assign-to-user-popper'
import { usePopover } from '@/hooks/use-popover'
import { X } from '@/icons/x'
import { AssignedUser, Order } from '@/types/order'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { generateAvatar } from '../../../utils/randomized-avatar'

type CompProps = {
  user: AssignedUser
  order: Order
  disabled?: boolean
  handleAssign: (emps: number[], orderid: number) => any
  handleUnAssign: (emps: number[], orderid: number) => any
}
function OrderUserAvatar(props: CompProps) {
  const { user, order, handleAssign, disabled, handleUnAssign } = props
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  return (
    <>
      <Box
        ref={anchorRef}
        sx={{
          position: 'relative',
          height: '30px',
          width: '30px',
          ml: '-10px',
          transition: '250ms',
          zIndex: '10',
          '&:hover': { transform: 'scale(1.2)', zIndex: 1000 },
          '&:hover .close': { display: 'flex' },
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (disabled) return
          handleOpen(true)
        }}
      >
        <Tooltip title={user?.name} arrow>
          {user.avatar.includes('placeholder') ? (
            generateAvatar(user.name, 30)
          ) : (
            <Avatar
              src={user.avatar}
              sx={{
                height: '30px',
                width: '30px',
                filter: disabled ? 'grayscale(0.9)' : null,
              }}
            />
          )}
          {/* <Avatar
            src={user.avatar}
            sx={{
              height: '30px',
              width: '30px',
              filter: disabled ? 'grayscale(0.9)' : null,
            }}
          /> */}
        </Tooltip>
        <IconButton
          disabled={disabled}
          className="close"
          component={Box}
          color="error"
          sx={{
            bgcolor: 'secondary.main',
            display: 'none',
            minHeight: 0,
            minWidth: 0,
            p: '1px',
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'white',
            '&:hover': { bgcolor: 'info.main' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (disabled) return
            handleUnAssign([user.id], order.id)
          }}
        >
          <X sx={{ fontSize: '12px', color: 'white' }} />
        </IconButton>
      </Box>
      <AssignToUserPopper
        anchorEl={anchorRef.current}
        open={open}
        handleClose={handleClose}
        order={order}
        handleAssign={handleAssign}
        handleUnAssign={handleUnAssign}
      />
    </>
  )
}

export default OrderUserAvatar
