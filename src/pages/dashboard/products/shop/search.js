import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

//local imports
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'
import ProductsFilter from '../../../../components/product/products-filter-form'
import ProductList from '../../../../components/product/product-list'
import ProductFilterControl from '../../../../components/product/product-filter-control'
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import { ArrowBack } from '@mui/icons-material'
import SearchProductsForm from '../../../../components/product/search-products-form'
import { useSettings } from '../../../../contexts/settings-context'
import { useProductsSearchQuery } from '../../../../queries/product'

let total = 0

const initialFilter = {
  min_quantity: 0,
  max_quantity: Infinity,
  min_price: 0,
  max_price: Infinity,
  name: '',
  category: [],
  sort: 'name',
  sortBy: 'asc',
}

const SearchResult = () => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [controller, setController] = useState({
    query: router.query.query,
    pagination: {
      page: 1,
      perPage: 20,
    },
  })
  const {
    query,
    pagination: { page, perPage },
  } = controller

  useEffect(() => {
    if (router.query.query) {
      setController((prev) => ({ ...prev, query: router.query.query }))
    }
    if (router.query.category) {
      let category = router.query.category.split('/')
      const id = category[0]
      const name = category[1]
      setFilter((prev) => ({ ...prev, category: [{ id, name }] }))
    }
  }, [router.query])
  const { t } = useTranslation()
  const {
    settings: { direction },
  } = useSettings()
  const formik = useFormik({
    initialValues: {
      min_quantity: filter.min_quantity,
      max_quantity: filter.max_quantity,
      min_price: filter.min_price,
      max_price: filter.max_price,
      category: filter.category,
      name: filter.name,
      sort: filter.sort,
      sortBy: filter.sortBy,
    },
    //this filter form necessite a validation
    onSubmit: (values) => {
      setFilter(values)
      setController((prev) => {
        return { ...prev, pagination: { ...prev.pagination, page: 1 } }
      })
    },
  })

  const handleChangePage = (newPage) => {
    setController((prev) => {
      return { ...prev, pagination: { ...prev.pagination, page: newPage } }
    })
  }

  const handleChangeQuery = (newQuery) => {
    setController((prev) => {
      return {
        ...prev,
        query: newQuery,
        pagination: { page: 1, ...prev.pagination },
      }
    })
  }
  const { data, isLoading, isError, error } = useProductsSearchQuery({
    ...filter,
    page,
    query,
  })
  const totalProducts = data?.meta?.total
  const products = data?.data || []
  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          pt: 4,
          overflow: 'hidden',
        }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={
            <ArrowBack
              sx={{ transform: direction === 'rtl' ? 'rotate(180deg)' : null }}
            />
          }
          sx={{ minwidth: 0, px: 0 }}
          onClick={() => router.back()}
        >
          {t('Back')}
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h2">{t('products.Search Result')}</Typography>
          {totalProducts && (
            <Typography variant="h5" color="textSecondary">
              {totalProducts}
            </Typography>
          )}
        </Box>
        <SearchProductsForm />
        <ProductFilterControl
          toggleOpenFilter={() => setIsFilterOpen((prev) => !prev)}
          submitFiltersForm={formik.handleSubmit}
          filter={filter}
          onChangeFilter={handleChangeFilter}
          isFilterOpen={isFilterOpen}
        />
        <Box container sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ProductsFilter
            isFilterOpen={isFilterOpen}
            handleChange={formik.handleChange}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />
          <ProductList
            totalProducts={totalProducts}
            page={page}
            perPage={perPage}
            onChangePage={handleChangePage}
            products={products}
            isLoading={isLoading}
            error={error}
            isError={isError}
            filter={filter}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default SearchResult

SearchResult.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}
