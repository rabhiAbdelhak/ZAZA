import { Box } from '@mui/material'
import { useGlobaleStateContext } from '../../contexts/global context/Provider'
import CartItem from './cart-item'

const CartItemsList = ({ cartItems }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        borderBottom: '2px solid',
        borderColor: 'grey.900',
      }}
    >
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />
      })}
    </Box>
  )
}

export default CartItemsList
