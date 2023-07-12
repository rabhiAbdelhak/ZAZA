import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import { useProductDetailQuery } from '@/queries/product'

import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ProductDetails from '../../../components/dashboard/product/product-details'
import { Product } from '@/types/product'

type ProductDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    product?: Product
  }

function ProductSideDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  product,
}: ProductDrawerProps) {
  const { data, isLoading, isSuccess, isError } = useProductDetailQuery(
    product?.id,
  )
  const { t } = useTranslation()

  // const onSubmit = (data: Partial<Supplier>, helpers: any) => {
  //   return toast.promise(mutation.mutateAsync({ ...data, id: supplier?.id }), {
  //     loading: t('toast.Saving'),
  //     success: (d) => {
  //       return t('toast.SavedSuccessfully')
  //     },
  //     error: (err: any) => {
  //       return err?.response?.data?.message || ''
  //     },
  //   })
  // }

  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={onNext}
        onPrev={onPrev}
        //disabled={mutation.isLoading}
        onClose={onClose}
      />
      <Box sx={{ px: 2 }}>
        <ProductDetails key={product?.id} productId={product?.id} inDrawer />
      </Box>
    </InternalDrawer>
  )
}

export default ProductSideDrawer
