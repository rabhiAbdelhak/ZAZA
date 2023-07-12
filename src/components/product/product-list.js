import { Box, Grid, Skeleton } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

//local imports
import ProductCard from './Product-card'
import { Pagination } from '../pagination'
import ErrorComponent from '../error-component'
import NotFoundAfterSearching from '../not-found-after-searching'
import { useUpdateProductSubscriptionMutation } from '../../queries/product'

const ProductList = ({
  isFilterOpen,
  totalProducts,
  page,
  perPage,
  products,
  isLoading,
  error,
  isError,
  onChangePage,
}) => {
  const { t } = useTranslation()
  const mutation = useUpdateProductSubscriptionMutation()

  const toggleSubscribe = (id, isSubscribe) => {
    const result = toast.promise(mutation.mutateAsync({ id, isSubscribe }), {
      loading: t('toast.Saving'),
      success: () => {
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        return err?.response?.data?.message
      },
    })
    return result
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((productSkelton) => {
            return (
              <Grid key={productSkelton} item md={2} sm={3}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '1px' }}
                >
                  <Skeleton height={200} sx={{ borderRadius: '20px', m: 0 }} />
                  <Skeleton sx={{ mt: '-25px' }} />
                  <Skeleton />
                </Box>
              </Grid>
            )
          })}
        </>
      )
    }

    if (isError) {
      return <ErrorComponent message={error?.response?.data?.message} />
    }

    if (products.length === 0) {
      return <NotFoundAfterSearching message="Products Not Found" />
    }
    return (
      <>
        {products.map((product) => {
          return (
            <Grid key={product.id} item md={2} sm={3}>
              <ProductCard
                product={product}
                main_picture={product.image}
                toggleSubscribe={toggleSubscribe}
              />
            </Grid>
          )
        })}
        {totalProducts > perPage && (
          <Grid
            item
            md={12}
            sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3 }}
          >
            <Pagination
              disabled={isLoading}
              onPageChange={onChangePage}
              page={page}
              pageSize={perPage}
              rowsCount={totalProducts}
            />
          </Grid>
        )}
      </>
    )
  }

  return (
    <Grid
      container
      spacing={2}
      columns={{ md: isFilterOpen ? 10 : 12, sm: isFilterOpen ? 10 : 12 }}
    >
      {renderContent()}
    </Grid>
  )
}

export default ProductList
