import { useState } from 'react'
import { useRouter } from 'next/router'
import { CheckOutlined } from '@mui/icons-material'
import { Box, Container, Typography, Grid, Button } from '@mui/material'

//local imports
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'
import ProductPagesDescriptionAdd from '../../../../components/product-pages-description-add'
import TargetRecomendations from '../../../../components/target-recomendations'
import ProductImages from '../../../../components/product/product-images'
import ProductPreview from '../../../../components/product/product-preview'
import PageTitleSearchForm from '../../../../components/page-title-search-Form'
import ProductDetailsInformation from '../../../../components/product/product-details-information'

import ErrorComponent from '../../../../components/error-component'
import LoadingDetailsComponent from '../../../../components/loading-details-component'
import { useProductDropshipDetailQuery } from '../../../../queries/product'

const ProductDetails = () => {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const { productId } = router.query

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useProductDropshipDetailQuery(productId)

  const changeCurrentImage = (index) => {
    setCurrentImage(index)
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDetailsComponent />
    }

    if (isError) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              p: 3,
            }}
          >
            <ErrorComponent message={error?.message} />
          </Box>
        </Box>
      )
    }

    if (product) {
      return (
        <>
          <ProductDetailsInformation product={product} />
          <ProductPagesDescriptionAdd />
          <TargetRecomendations />
          <Box mb={-10}>
            <Typography variant="h4" color="text.primary">
              Shine on social media
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              Whether you want to sell products down the street or around the
              world, we have all the tools you need.
            </Typography>
          </Box>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid
              item
              md={6}
              sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: '16px' }}>
                <Typography variant="h5" color="text.primary" mb={2}>
                  Post Description
                </Typography>
                <Typography variant="body2" color="text.primary" mb={1}>
                  “While operating my photostereotype process in Ithaca, I
                  studied the problem of halftone process,” Ives said. “I went
                  to bed one night in a state of brain fog over the problem, and
                  the instant I woke in the morning saw before me, apparently
                  projected on the ceiling, the completely worked out process
                  and equipment in operation.”
                </Typography>
                <Button size="medium" variant="outlined" color="secondary">
                  Copy Text
                </Button>
              </Box>
              <ProductImages
                changeCurrentImage={changeCurrentImage}
                product={product}
              />
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: '16px' }}>
                <Typography variant="h5" color="text.primary" mb={2}>
                  Ad Title
                </Typography>
                <Typography variant="subtitle2" color="text.primary" mb={1}>
                  Get it 18% off
                </Typography>
                <Button
                  variant="outlined"
                  size="medium"
                  color="success"
                  startIcon={<CheckOutlined />}
                >
                  Text Copied
                </Button>
              </Box>
              <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: '16px' }}>
                <Typography variant="h5" color="text.primary" mb={2}>
                  Ad Description
                </Typography>
                <Typography variant="body2" color="text.primary" mb={1}>
                  I woke in the morning saw before me, apparently projected on
                  the ceiling, the completely worked out process and equipment
                  in operation.”
                </Typography>
                <Button size="medium" variant="outlined" color="secondary">
                  Copy Text
                </Button>
              </Box>
            </Grid>
            <Grid item md={5.8}>
              <ProductPreview
                current={currentImage}
                product={product}
                changeCurrentImage={changeCurrentImage}
              />
            </Grid>
          </Grid>
        </>
      )
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          pt: 5,
        }}
      >
        {renderContent()}
      </Container>
    </Box>
  )
}

ProductDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <PageTitleSearchForm pageTitle="Product Details" />
      {page}
    </DashboardLayout>
  </AuthGuard>
)

export default ProductDetails
