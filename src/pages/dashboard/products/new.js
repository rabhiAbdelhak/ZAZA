import Head from 'next/head'
import { Box, Button, Typography } from '@mui/material'
import NextLink from 'next/link'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import { Container } from '@mui/system'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import * as productApi from '../../../api/product'
import toast from 'react-hot-toast'
import ProductForm from '../../../components/dashboard/product/product-form'
import { useTranslation } from 'react-i18next'

const ProductSummary = () => {
  const { t } = useTranslation()

  const onSubmit = async (values, helpers) => {
    return toast.promise(productApi.createProduct(values), {
      loading: t('toast.Creating'),
      success: (response) => {
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        helpers.resetForm()
        return t('toast.CreatedSuccessfully')
      },
      error: (err) => {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err?.response?.data?.message })
        helpers.setSubmitting(false)
      },
    })
  }

  return (
    <>
      <Head>
        <title>{t('products.NewProduct')}</title>
      </Head>
      <Container maxWidth={false}>
        <Box sx={{ py: 4 }}>
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

          <Typography color="textPrimary" variant="h4">
            {t('products.NewProduct')}
          </Typography>
        </Box>
        <ProductForm
          onSubmit={onSubmit}
          submitTitle={t('products.CreateProduct')}
        />
      </Container>
    </>
  )
}

ProductSummary.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ProductSummary
