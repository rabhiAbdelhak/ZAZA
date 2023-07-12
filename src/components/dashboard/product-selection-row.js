import { Box, Button, TableCell, TableRow, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../utils/formats'
import QuantityInput from '../quantity-input'
import PriceComponent from './price-component'

const ProductSelectionRow = ({
  product,
  onChangePrice,
  onChangeAmount,
  handleRemove,
}) => {
  const { t } = useTranslation()

  const changeProductAmount = (value) => {
    onChangeAmount(product.id, value)
  }

  const handleChangePrice = (value) => {
    onChangePrice(product.id, value)
  }

  return (
    <TableRow>
      <TableCell
        sx={{ display: 'flex', flex: 2, alignItems: 'flex-start', gap: 1 }}
      >
        {product && (
          <Image
            src={
              product?.images?.length == 0
                ? '/android-chrome-512x512.png'
                : '/android-chrome-512x512.png'
            }
            width={50}
            height={50}
            alt={product.name}
            style={{ borderRadius: '5px' }}
          />
        )}
        <Box>
          <Typography
            noWrap
            variant="body2"
            color="textPrimary"
            sx={{ maxWidth: 200 }}
          >
            {product.name}
          </Typography>
          <Typography variant="caption" color="secondary">
            DZD {dinarFormat(product.price)}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary" mt={2}>
            {product.quantity} {t('cart.items available')}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <PriceComponent
          value={product.selling_price}
          min={product.price}
          handleChange={handleChangePrice}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex' }}>
          <QuantityInput
            disableText={true}
            readOnly
            value={product?.amount}
            max={product?.quantity}
            handleAmountChange={changeProductAmount}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleRemove(product.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ProductSelectionRow
