import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

//local imports
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import EcOrderCreateForm from '../../../components/dashboard/order/ec-order-Create-Form'
import OrderCheckout from '../../../components/dashboard/order/order-checkout'
import OrderSubmited from '../../../components/dashboard/order/order-submited'
import { Stepper } from '../../../components/stepper'
import { useCreateOrderMutation } from '../../../queries/order'
import Head from 'next/head'

const steps = [
  {
    title: 'Order Information',
  },
  { title: 'Resume' },
]

const NewEcommerceOrder = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [completed, setCompleted] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  })
  const [AllStepsCompleted, setAllStepsCompleted] = useState(false)
  const [order, setCurrentOrder] = useState(null)
  const { t } = useTranslation()

  const router = useRouter()

  const HandleSteperCompleted = () => {
    setAllStepsCompleted(true)
  }
  const handleComplete = (step) => {
    let newCompleted = completed
    newCompleted[step] = true
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleAddProduct = (product) => {
    setSelectedProducts((prev) => {
      return [...prev, product]
    })
  }

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => {
      return prev.filter((product) => product.id !== id)
    })
  }

  const handleChangeAmount = (id, value) => {
    setSelectedProducts((prev) => {
      const newProducts = prev.map((product) => {
        return product.id === id ? { ...product, amount: value } : product
      })
      return newProducts
    })
  }
  const mutation = useCreateOrderMutation()

  const handleSetCurrentOrder = (newInfo) => {
    setCurrentOrder((prev) => ({ ...prev, ...newInfo }))
  }

  const handleCreateOrder = (newData) => {
    return toast.promise(mutation.mutateAsync(newData), {
      loading: t('toast.Creating'),
      success: () => {
        setCurrentOrder({})
        return t('toast.CreatedSuccessfully')
      },
      error: (err) => {
        return err?.response?.data?.message
      },
    })
  }

  const handleChangePrice = (id, value) => {
    setSelectedProducts((prev) => {
      const newProducts = prev.map((product) => {
        return product.id === id
          ? { ...product, selling_price: value }
          : product
      })
      return newProducts
    })
  }

  const handleValidate = () => {
    setCompleted((prev) => ({ ...prev, 3: true }))
  }

  if (AllStepsCompleted) {
    return <OrderSubmited />
  }

  return (
    <>
      <Head>
        <title>{t('New Order')}</title>
      </Head>
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
          <Typography variant="caption" color="textPrimary">
            (e-commerce)
          </Typography>

          <Stepper
            currentStep={activeStep}
            steps={steps}
            orientation="horizontal"
            sx={{ my: 8 }}
          />
          <Box>
            {activeStep === 0 && (
              <EcOrderCreateForm
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                selectedProducts={selectedProducts}
                handleComplete={handleComplete}
                onChangeProductAmount={handleChangeAmount}
                onChangeProductPrice={handleChangePrice}
                onValidate={handleValidate}
                onStepperFinished={HandleSteperCompleted}
                setCurrentOrder={handleSetCurrentOrder}
                onCreate={handleCreateOrder}
              />
            )}
            {activeStep === 1 && (
              <OrderCheckout
                order={order}
                onValidate={handleValidate}
                onStepperFinished={HandleSteperCompleted}
                onUpdate={handleSetCurrentOrder}
                validation
                onCreate={handleCreateOrder}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default NewEcommerceOrder

NewEcommerceOrder.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)
