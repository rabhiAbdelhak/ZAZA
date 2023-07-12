import { Box, Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useTranslation } from 'react-i18next'
import ProductForm from './product-form'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import NextLink from 'next/link'
import { useAsync } from '../../../hooks/useAsync'
import * as productApi from '../../../api/product'
import { useCallback, useEffect } from 'react'
import LoadingDetailsComponent from '../../loading-details-component'
import { ResourceError } from '../../resource-error'
import toast from 'react-hot-toast'
import ProductDetailsStats from './product-details-stats'
import ProductLogTable from './product-log.table'
import { productKeys, useProductDetailQuery } from '../../../queries/product'
import { useQueryClient } from '@tanstack/react-query'

function ProductDetails({ inDrawer, productId }) {
  const { t } = useTranslation()

  const {
    data: product,
    isSuccess,
    isError,
    isLoading,
    refetch: loadProduct,
  } = useProductDetailQuery(productId, { enabled: Boolean(productId) })

  const queryClient = useQueryClient()

  const onSubmit = async (values, helpers) => {
    const { images, ...others } = values
    const imagesToAdd = images.filter((el) => el instanceof File)
    const imagesUrls = images.filter((el) => !(el instanceof File))
    const imagesToRemove = product.images.filter(
      (el) => !imagesUrls.includes(el),
    )

    return toast.promise(
      productApi.updateProduct(productId, {
        ...others,
        imagesToRemove,
        imagesToAdd,
      }),
      {
        loading: t('toast.Creating'),
        success: () => {
          queryClient.invalidateQueries({ queryKey: productKeys.all })
          helpers.setStatus({ success: true })
          helpers.setSubmitting(false)
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err?.response?.data?.message })
          helpers.setSubmitting(false)
        },
      },
    )
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ py: 4 }}>
        {!inDrawer && (
          <Box sx={{ mb: 2 }}>
            <NextLink href="/dashboard/products" passHref>
              <Button
                color="primary"
                component="a"
                startIcon={<ArrowLeftIcon />}
                variant="text"
              >
                {t('products.Back')}
              </Button>
            </NextLink>
          </Box>
        )}

        <Typography color="textPrimary" variant="h4" sx={{ px: 2 }}>
          {t('products.ProductDetails')}
        </Typography>
      </Box>

      {isLoading && <LoadingDetailsComponent />}
      {isSuccess && (
        <Box display="flex" flexDirection="column" gap={4}>
          <ProductDetailsStats
            qtyDamaged={product?.quantity_damaged}
            qtyInConfirmation={product?.quantity_in_confirmation}
            qtyInDelivery={product?.quantity_delivery}
            qtyInDeposit={product?.quantity}
            autoResize={inDrawer ? 210 : 250}
          />

          <ProductForm
            autoResize={inDrawer ? 400 : 0}
            submitTitle={t('form.Save')}
            initialValues={product}
            onSubmit={onSubmit}
          />

          <ProductLogTable logs={product?.stock_movements} />
        </Box>
      )}
      {isError && <ResourceError onReload={loadProduct} />}
    </Container>
  )
}

export default ProductDetails
