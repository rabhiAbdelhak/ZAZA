import AddUserButton from '@/components/add-user-btn'
import { Order } from '@/types/order'
import { dinarFormat } from '@/utils/formats'
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import OrderStatusTag from './order-status-tag'
import OrderUserAvatar from './order-user-avatar'

type CompProps = {
  orders: any
  statusList: any
  selectedOrderid: number
  handleAssign: (emps: any[], orderid: number) => any
  handleUnAssign: (emps: any[], orderid: number) => any
  handleSingleOrderSelection: (id: number) => any
  openDrawer?: boolean
}

const OrdersMiniTable = (props: CompProps) => {
  const {
    orders,
    statusList,
    selectedOrderid,
    handleAssign,
    handleUnAssign,
    openDrawer,
    handleSingleOrderSelection,
  } = props

  const { t } = useTranslation()

  return (
    <>
      <TableContainer
        sx={{
          transition: '250ms',
          position: 'absolute',
          left: openDrawer ? '0px' : '00px',
          top: 0,
          width: openDrawer ? '100%' : '0',
          zIndex: 10,
          maxHeight: '580px',
          bgcolor: 'background.default',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} sx={{ bgcolor: 'neutral.50', zIndex: 10 }}>
                {t('Order Information')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order: Order) => {
              const statusVariant =
                statusList.find((status: any) => status.id === order.status) ||
                statusList.find((status: any) => status.id === 3)
              const isSelected = Boolean(selectedOrderid === order.id)
              return (
                <TableRow
                  key={order.id}
                  selected={isSelected}
                  sx={{
                    backgroundColor: isSelected
                      ? 'red'
                      : 'RowMiniTableColor.primary',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSingleOrderSelection(order.id)}
                >
                  <TableCell>
                    <Box>
                      <Typography
                        variant="subtitle1"

                        // color="textSecondary"
                      >
                        #{order?.tracking_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {Boolean(order?.assigned_users?.length) ? (
                        <Box sx={{ display: 'flex' }}>
                          {order?.assigned_users
                            .slice(0, 3)
                            .map((user: any) => {
                              return (
                                <OrderUserAvatar
                                  key={user.id}
                                  user={user}
                                  order={order}
                                  handleAssign={handleAssign}
                                  handleUnAssign={handleUnAssign}
                                  disabled={!isSelected}
                                />
                              )
                            })}
                        </Box>
                      ) : (
                        <AddUserButton
                          order={order}
                          handleAssign={handleAssign}
                          disabled={!isSelected}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <OrderStatusTag
                      order={order}
                      statusVariant={statusVariant}
                      disabled={!isSelected}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default OrdersMiniTable
