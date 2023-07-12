import { Box, Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Step1Form from '../../../components/landing/forms/step1-form'
import Step2Form from '../../../components/landing/forms/step2-form'
import Step3Form from '../../../components/landing/forms/step3-form'
import { Stepper } from '../../../components/stepper'
import NextLink from 'next/link'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import toast from 'react-hot-toast'
import { useCreateLandingMutation } from '../../../queries/landing'

export default function NewLandingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { t } = useTranslation()
  const [data, setData] = useState()

  const mutation = useCreateLandingMutation()

  const steps = [
    { title: t('landing.ProductInformation') },
    { title: t('landing.ProductLinks') },
    { title: t('landing.PageCustomization') },
  ]

  const onGoNext = async (values, helpers) => {
    const newData = { ...data, ...values }
    setData(newData)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      return
    }
    return toast.promise(mutation.mutateAsync(newData), {
      loading: t('toast.Creating'),
      success: () => {
        setData({})
        setCurrentStep(0)
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        return t('toast.CreatedSuccessfully')
      },
      error: (err) => {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err?.response?.data?.message })
        return err?.response?.data?.message
      },
    })
  }

  const onGoBack = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <NextLink href="/dashboard/products" passHref>
            <Button
              color="primary"
              component="a"
              startIcon={<ArrowLeftIcon />}
              variant="text"
            >
              {t('landing.LandingPages')}
            </Button>
          </NextLink>
        </Box>

        <Typography color="textPrimary" variant="h4">
          {t('landing.NewLandingPage')}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        justifyContent="center"
      >
        <Stepper
          orientation="horizontal"
          steps={steps}
          currentStep={currentStep}
        />
        {currentStep === 0 && (
          <Step1Form
            onGoNext={onGoNext}
            initialValues={data}
            disabled={mutation.isLoading}
          />
        )}
        {currentStep === 1 && (
          <Step2Form
            onGoNext={onGoNext}
            onGoBack={onGoBack}
            initialValues={data}
            disabled={mutation.isLoading}
          />
        )}
        {currentStep === 2 && (
          <Step3Form
            onGoNext={onGoNext}
            onGoBack={onGoBack}
            initialValues={data}
            disabled={mutation.isLoading}
          />
        )}
      </Box>
    </Container>
  )
}

NewLandingPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)
