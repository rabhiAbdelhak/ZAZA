import ProductDetails from '../../../../components/dashboard/product/product-details'
import { useRouter } from 'next/router'
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'

const ProductDetailsPage = () => {
  const { query } = useRouter()
  const productId = Number(query?.productId)

  return <ProductDetails productId={productId} />
}

ProductDetailsPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ProductDetailsPage
