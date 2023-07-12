import { Delete } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '../../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout'
import PageTitleSearchForm from '../../../../components/page-title-search-Form'
import CartItemsList from '../../../../components/product/cart-items-list'
import CartTotalsBox from '../../../../components/product/cart-totals-box'
import EmptyCart from '../../../../components/product/empty-cart'
import { removeCart } from '../../../../contexts/global context/actions/cart-actions'
import { setAlertDialogStatus } from '../../../../contexts/global context/actions/component-actions'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../../../contexts/global context/Provider'

const CartPage = () => {
  const { cartDispatch: dispatch, componentDispatch } =
    useGlobaleDispatchContext()
  const { t } = useTranslation()

  const removeCartItems = () => {
    setAlertDialogStatus({
      message: t(
        "cart.Are you sure you want to delete the entire product list? This can't be undone.",
      ),
      title: t('cart.Empty cart'),
      open: true,
      buttonText: t('cart.Empty cart'),
      onConfirm: () => removeCart()(dispatch),
    })(componentDispatch)
  }
  const {
    cartState: { cartItems },
  } = useGlobaleStateContext()
  const renderContent = () => {
    if (!cartItems?.length) {
      return <EmptyCart />
    }

    return (
      <>
        <Button
          variant="contained"
          startIcon={<Delete />}
          color="error"
          onClick={removeCartItems}
        >
          {t('cart.Clear cart items')}
        </Button>
        <CartItemsList cartItems={cartItems} />
        <CartTotalsBox />
      </>
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>{renderContent()}</Container>
    </Box>
  )
}

export default CartPage

CartPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <PageTitleSearchForm pageTitle="Cart" />
      {page}
    </DashboardLayout>
  </AuthGuard>
)
