import {
  Adjust,
  ArrowBack,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

//local imports
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import OrderCheckout from '../../../components/dashboard/order/order-checkout'
import OrderCreateForm from '../../../components/dashboard/order/order-create-form'
import OrderCreateLoading from '../../../components/dashboard/order/order-create-loading'
import OrderSubmited from '../../../components/dashboard/order/order-submited'
import { removeCart } from '../../../contexts/global context/actions/cart-actions'
import { useGlobaleDispatchContext } from '../../../contexts/global context/Provider'
import { useCreateOrderMutation } from '../../../queries/order'

const NewOrder = () => {
  const [checking, setChecking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const { t } = useTranslation()
  const { cartDispatch } = useGlobaleDispatchContext()

  const router = useRouter()
  const [order, setCurrentOrder] = useState({})

  const mutation = useCreateOrderMutation()
  const handleCreateOrder = (newData) => {
    return toast.promise(mutation.mutateAsync(newData), {
      loading: t('toast.Creating'),
      success: () => {
        setCurrentOrder({})
        removeCart()(cartDispatch)
        return t('toast.CreatedSuccessfully')
      },
      error: (err) => {
        return err?.response?.data?.message
      },
    })
  }

  const handleSetCurrentOrder = (newInfo) => {
    setCurrentOrder((prev) => ({ ...prev, ...newInfo }))
  }

  if (validated) {
    return <OrderSubmited />
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>
        <Button
          size="small"
          color="primary"
          startIcon={<ArrowBack />}
          sx={{ border: 0, minHeight: 0, minWidth: 0, pl: 0, mt: 5 }}
          onClick={() => router.back()}
        >
          {t('Back')}
        </Button>
        <Typography variant="h4">{t('orders.New Order')}</Typography>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              my: 5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                {checking ? (
                  <CheckCircle color="primary" sx={{ fontSize: '30px' }} />
                ) : (
                  <Adjust color="primary" sx={{ fontSize: '30px' }} />
                )}
              </IconButton>
              <Typography
                sx={{ textTransform: 'uppercase' }}
                variant="subtitle2"
                color={checking ? 'text.primary' : 'primary'}
              >
                {t('orders.Order Information')}
              </Typography>
            </Box>
            <Box
              bgcolor={checking ? 'primary.main' : 'text.disabled'}
              sx={{ height: '2px', width: '20px' }}
            ></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton disabled={!checking}>
                {checking ? (
                  <Adjust color="primary" sx={{ fontSize: '30px' }} />
                ) : (
                  <RadioButtonUnchecked sx={{ fontSize: '30px' }} />
                )}
              </IconButton>
              <Typography
                sx={{ textTransform: 'uppercase' }}
                variant="subtitle2"
                color={!checking ? 'text.disabled' : 'primary'}
              >
                {t('Resume')}
              </Typography>
            </Box>
          </Box>
        </Box>
        {loading ? (
          <OrderCreateLoading />
        ) : checking && order ? (
          <OrderCheckout
            validation={true}
            setValidated={setValidated}
            order={order}
            onUpdate={handleSetCurrentOrder}
            onCreate={handleCreateOrder}
          />
        ) : (
          <OrderCreateForm
            onCreate={handleCreateOrder}
            setChecking={setChecking}
            setLoading={setLoading}
            setCurrentOrder={handleSetCurrentOrder}
            setValidated={setValidated}
          />
        )}
      </Container>
    </Box>
  )
}

export default NewOrder

NewOrder.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)
