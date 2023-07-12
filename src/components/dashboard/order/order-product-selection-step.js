import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ProductsSelection from '../products-selection'

const OrderProductsSelectionStep = ({
  handleAdd,
  handleRemove,
  selectedProducts,
  handleComplete,
  onChangeAmount,
  onChangePrice,
}) => {
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl">
      <ProductsSelection
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        sx={{ mb: 2 }}
        selectedProducts={selectedProducts}
        onChangeAmount={onChangeAmount}
        onChangePrice={onChangePrice}
      />
      <Box sx={{ width: '70%', m: '0 auto' }}>
        <Button
          disabled={selectedProducts.length <= 0}
          sx={{ float: 'right', mt: 2, color: 'primary.contrast' }}
          variant="contained"
          onClick={() => handleComplete(0)}
        >
          {t('Continue')}
        </Button>
      </Box>
    </Container>
  )
}

export default OrderProductsSelectionStep
