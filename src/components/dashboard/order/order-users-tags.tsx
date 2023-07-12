import AddUserButton from '@/components/add-user-btn'
import { AssignedUser, Order } from '@/types/order'
import { MoreHoriz } from '@mui/icons-material'
import { Box } from '@mui/material'

import OrderUserAvatar from './order-user-avatar'

type CompProps = {
  order: Order
  handleAssign: (emps: number[], orderid: number) => void
  handleUnAssign: (emps: number[], id: number) => any
}

const OrderUsersTags = (props: CompProps) => {
  const { order, handleAssign, handleUnAssign } = props
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {order?.assigned_users.slice(0, 3).map((user: AssignedUser) => {
        return (
          <OrderUserAvatar
            key={user.id}
            user={user}
            order={order}
            handleAssign={handleAssign}
            handleUnAssign={handleUnAssign}
          />
        )
      })}
      {order?.assigned_users.length <= 3 &&
        order?.assigned_users.length >= 0 && (
          <AddUserButton order={order} handleAssign={handleAssign} />
        )}
      {order?.assigned_users.length > 3 && <MoreHoriz />}
    </Box>
  )
}

export default OrderUsersTags
