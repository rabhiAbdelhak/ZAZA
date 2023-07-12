import { useState } from 'react'
import Head from 'next/head'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from '@mui/material'
import ProductSideDrawer from '@/components/dashboard/product/product-side-drawer'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { ProductsFilter } from '../../../components/dashboard/product/products-filter'
import { ProductsTable } from '../../../components/dashboard/product/products-table'
import { Plus as PlusIcon } from '../../../icons/plus'
import NextLink from 'next/link'
import ResizableDrawer, {
  ResizableDrawerToolbar,
} from '../../../components/ResizableDrawer'
import { useTranslation } from 'react-i18next'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { useProductsQuery } from '../../../queries/product'

const Products = () => {
  const [filter, setFilter] = useState({
    page: 0,
    'filter[query]': '',
    'filter[name]': '',
    'filter[min_quantity]': '',
    'filter[max_quantity]': '',
    'filter[reference]': '',
    'filter[provider]': '',
    'filter[price1]': '',
  })

  const { t } = useTranslation()

  const { data: products, isLoading, error } = useProductsQuery({ filter })
  const onClose = () => setSelectedItem(undefined)
  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem(products)
  const isOpen = Boolean(selectedItem)
  const [selectedProduct, setSelectedProduct] = useState()

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  const handleClick = (productId) => {
    setSelectedProduct(productId)
  }

  const closeDetailDrawer = () => {
    setSelectedProduct(null)
  }

  const goNextProduct = () => {
    const find = products?.data?.find((el) => el.id === selectedProduct)
    const index = products?.data.indexOf(find)
    const selecteditem = products?.data[index + 1] || products?.data[0]
    setSelectedProduct(selecteditem.id)
  }

  const goPrevProduct = () => {
    const find = products?.data?.find((el) => el.id === selectedProduct)
    const index = products?.data.indexOf(find)
    const selecteditem =
      products?.data[index - 1] || products?.data[products?.data.length - 1]
    setSelectedProduct(selecteditem.id)
  }

  return (
    <>
      <Head>
        <title>Product: Shop | Zimou Express</title>
      </Head>

      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          gap: 2,
          height: 'calc(100vh - 215px)',
        }}
      >
        <Card sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {!isOpen && (
            <Box sx={{ p: 2 }}>
              <Box sx={{ alignItems: 'center', display: 'flex' }}>
                <Typography color="textPrimary" variant="h4">
                  {t('Products')}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <NextLink href="/dashboard/products/new">
                  <Button
                    color="primary"
                    size="large"
                    data-testid="new-product"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    {t('products.NewProduct')}
                  </Button>
                </NextLink>
              </Box>
            </Box>
          )}
          <ProductsFilter
            disabled={isLoading}
            filter={filter}
            onFilter={setFilter}
          />
          <Divider />
          <ProductsTable
            openDrawer={isOpen}
            error={error?.message || ''}
            isLoading={isLoading}
            onClickItem={handleClick}
            onPageChange={handlePageChange}
            page={products?.meta?.current_page || 1}
            products={products?.data}
            productsCount={products?.meta?.total || 0}
            pageSize={products?.meta?.per_page}
            onSelectProduct={setSelectedItem}
            filter={filter}
            onFilter={setFilter}
          />
        </Card>
        <ProductSideDrawer
          onClose={onClose}
          open={isOpen}
          product={selectedItem}
          onNext={goNext}
          onPrev={goPrev}
          sx={{ flex: 2, height: '100%' }}
        />
      </Container>
    </>
  )
}

Products.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Products
