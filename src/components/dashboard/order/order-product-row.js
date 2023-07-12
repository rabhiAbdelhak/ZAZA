import {
  Avatar,
  Box,
  TableCell,
  TableRow,
  Typography,
  Button,
  Tooltip,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../../utils/formats'
import QuantityInput from '../../quantity-input'
import ImagePopOver from '../image-popover'
import PriceComponent from '../price-component'

const OrderProductRow = ({
  product: item,
  updateSellingPrice,
  updateQuantity,
  onDelete,
  totalProducts,
  Editable,
}) => {
  const { t } = useTranslation()
  const [refImage, setRefImage] = useState(null)
  const [openImage, setOpenImage] = useState(false)

  const handleOpenImage = () => {
    setOpenImage(true)
  }
  const handleCloseImage = (e) => {
    setOpenImage(false)
  }

  const handlePriceChange = (price) => {
    updateSellingPrice(item.id, price)
  }

  const handleQuantityChange = (price) => {
    updateQuantity(item.id, price)
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
          <ImagePopOver
            image={item?.images?.[0] || item?.image}
            anchorRf={refImage}
            open={openImage}
            handleClose={handleCloseImage}
          />
          <Box ref={setRefImage} style={{ cursor: 'pointer' }}>
            <Avatar
              alt={item?.name}
              src={item?.images?.[0] || item?.image}
              sx={{ width: 70, height: 70 }}
              variant="square"
              onMouseEnter={handleOpenImage}
              onMouseLeave={handleCloseImage}
            />
          </Box>
          <Box>
            <Tooltip title={item.name} arrow>
              <Typography
                noWrap
                variant="subtitle2"
                color="text.primary"
                sx={{ maxWidth: '150px' }}
              >
                {item.name}
              </Typography>
            </Tooltip>
            <Typography noWrap variant="subtitle2" color="text.secondary">
              {t('Attributes.Product ID')}: {item.id}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Typography noWrap variant="inherit">
          {dinarFormat(item.price)}
        </Typography>
      </TableCell>
      <TableCell align="left">
        {Editable ? (
          <PriceComponent
            value={
              item.selling_price
                ? item.selling_price
                : item.order_product?.price
            }
            handleChange={handlePriceChange}
            min={item.price}
          />
        ) : (
          <Typography variant="inherit" color="inherit">
            {dinarFormat(item?.order_product?.price)}
          </Typography>
        )}
      </TableCell>
      <TableCell align="left">
        {Editable ? (
          <QuantityInput
            disableText={true}
            readOnly
            value={item?.order_product?.quantity}
            max={item?.quantity}
            handleAmountChange={handleQuantityChange}
          />
        ) : (
          <Typography variant="inherit" color="inherit">
            {item?.order_product?.quantity}
          </Typography>
        )}
      </TableCell>
      <TableCell align="left">
        <Typography noWrap variant="inherit">
          {dinarFormat(
            (item.selling_price || item.order_product?.price) *
              item.order_product?.quantity,
          )}
        </Typography>
      </TableCell>
      {onDelete && (
        <TableCell>
          <Button
            disabled={totalProducts <= 1}
            variant="text"
            onClick={() => onDelete(item.id)}
          >
            {t('Delete')}
          </Button>
        </TableCell>
      )}
    </TableRow>
  )
}

export default OrderProductRow
