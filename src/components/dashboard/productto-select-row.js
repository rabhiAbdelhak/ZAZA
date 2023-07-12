import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '../../utils/formats'

const ProductToSelectRow = ({ product, handleAdd, isSelected }) => {
  const { t } = useTranslation()

  const addProductToSelected = () => {
    if (isSelected(product.id)) {
      return
    }
    handleAdd({
      id: product.id,
      quantity: product.quantity,
      amount: 1,
      selling_price: product.suggested_price,
      name: product.name,
      price: product.price1,
      image:
        product?.images?.length == 0
          ? '/android-chrome-512x512.png'
          : product?.images[0],
    })
  }
  return (
    <Box
      key={product.id}
      disabled={isSelected(product.id)}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: '500ms',
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'primary.50' },
      }}
      onClick={addProductToSelected}
    >
      <Box sx={{ display: 'flex', flex: 2, alignItems: 'flex-start', gap: 1 }}>
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
            DZD{dinarFormat(product.price1)}
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ flex: 1 }} variant="body2" color="textprimary">
        QTY: {product.quantity || '-'}
      </Typography>
      <Typography sx={{ flex: 1 }} variant="body2" color="textprimary">
        ProductID:{product.id}
      </Typography>
    </Box>
  )
}

export default ProductToSelectRow
