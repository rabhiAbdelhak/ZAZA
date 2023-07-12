import { Box, Container, Grid } from '@mui/material'
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import CategoriesMenu from '../../../../components/category/categories-menu'
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'
import ShopLoading from '../../../../components/dashboard/product/shop-loading'

//local imports
import PubSlider from '../../../../components/dashboard/pub-slider'
import ErrorComponent from '../../../../components/error-component'
import PageTitleSearchForm from '../../../../components/page-title-search-Form'
import ListProduct from '../../../../components/product/prduct-list-by-category'
import { useGetProductsByCategoryQuery } from '../../../../queries/product'

const ProductsShop = () => {
  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useGetProductsByCategoryQuery()

  const renderContent = () => {
    if (isLoading) {
      return <ShopLoading />
    }
    if (error) {
      return <ErrorComponent message={error?.response.data?.message} />
    }

    return (
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'space-between', mt: 2 }}
      >
        <CategoriesMenu categories={categories} />
        <Grid
          item
          md={9}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '100%',
          }}
        >
          {!isLoading ? (
            categories.map((category) => {
              return (
                category?.products?.length > 0 && (
                  <ListProduct key={category.id} category={category} />
                )
              )
            })
          ) : (
            <ShopLoading />
          )}
          <PubSlider />
        </Grid>
      </Grid>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>{renderContent()}</Container>
    </Box>
  )
}

ProductsShop.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <PageTitleSearchForm pageTitle="Products" />
      {page}
    </DashboardLayout>
  </AuthGuard>
)

export default ProductsShop
