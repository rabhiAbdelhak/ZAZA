import { usePopover } from '@/hooks/use-popover'
import { Plus } from '@/icons/plus'
import { useEmployeesQuery } from '@/queries/employee'
import { Avatar, Box, Button, Skeleton } from '@mui/material'
import OrderUserFilterPopper from './order-user-filter-popper'
import { generateAvatar } from '../../../utils/randomized-avatar'

type CompProps = {
  filter: any
  onApplyFilters: (newFilter: any) => any
}
const OrderUsersFilter = (props: CompProps) => {
  const { filter, onApplyFilters } = props
  const { data: users, isLoading } = useEmployeesQuery() as any
  const [anchorRef, open, handleOpen, handleClose] = usePopover()

  const handleFilterByUser = (id: number) => {
    if (!filter.assigned_users.includes(id)) {
      onApplyFilters({
        ...filter,
        assigned_users: [...filter.assigned_users, id],
      })
    } else {
      onApplyFilters({
        ...filter,
        assigned_users: filter.assigned_users.filter(
          (userid: number) => userid !== id,
        ),
      })
    }
  }

  // function generateInitials(name: any) {
  //   let initials = ''
  //   name.split(' ').forEach((word: any) => {
  //     initials += word[0]
  //   })
  //   return initials.toUpperCase()
  // }

  // function generateRandomColor() {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(15)
  // }

  // function generateAvatar(name: any) {
  //   const initials = generateInitials(name)
  //   const color = generateRandomColor()

  //   return <Avatar sx={{ width: '30px', height: '30px' }}>{initials}</Avatar>
  // }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {users?.slice(0, 3).map((user: any) => {
          const isAssigned = Boolean(filter.assigned_users.includes(user.id))
          return (
            <Box
              key={user.id}
              sx={{
                border: isAssigned ? '3px solid' : 'none',
                borderColor: 'primary.main',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => handleFilterByUser(user.id)}
            >
              {user.avatar.includes('placeholder') ? (
                generateAvatar(user.name, 30)
              ) : (
                <Avatar
                  src={user.avatar}
                  sx={{ width: '30px', height: '30px' }}
                />
              )}
            </Box>
          )
        })}
        <Button
          ref={anchorRef}
          sx={{
            bgcolor: 'neutral.100',
            color: 'secondary.main',
            gap: '2px',
            display: 'flex',
            height: '30px',
            width: '30px',
            minWidth: '0',
            borderRadius: '50%',
          }}
          onClick={handleOpen}
        >
          +{users?.length - 3}
        </Button>
      </Box>
      <OrderUserFilterPopper
        users={users.slice(3, users.length)}
        anchorEl={anchorRef.current}
        open={open}
        handleClose={handleClose}
        onApplyFilters={onApplyFilters}
      />
    </>
  )
}

export default OrderUsersFilter
