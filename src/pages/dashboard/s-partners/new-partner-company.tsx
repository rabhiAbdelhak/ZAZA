import { NextPageWithLayout } from '../../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Link, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Stepper } from '@/components/stepper'
import { useState } from 'react'
import PartnerCompanyCreationForm from '@/components/dashboard/partner-company/partner-company-creation-form'
import {
  useAddDeliveryTypeToDeliveryCompany,
  useCreatePartnerCompanyMutation,
} from '@/queries/partner-company'
import toast from 'react-hot-toast'
import PartnerCompanyPricingTypes from '@/components/dashboard/partner-company/partner-company-pricing-types'

const Page: NextPageWithLayout = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const { t } = useTranslation()
  const steps = [
    {
      title: t('delivery.Delivery Company Creation'),
    },
    {
      title: t('delivery.Pricing'),
    },
    {
      title: t('Town delivery management'),
    },
  ]
  const [createdPartnerCompany, setCreatedPartnerCompany] =
    useState<PartnerCompany>()
  const createMutation = useCreatePartnerCompanyMutation() as any
  const { mutateAsync: mutationDelivery } =
    useAddDeliveryTypeToDeliveryCompany() as any
  console.log(mutationDelivery)

  const createCompany = (data: PartnerCompany) => {
    toast.promise(createMutation.mutateAsync(data), {
      loading: 'Partner company creation',
      success: (dataSuccess: any) => {
        console.log(dataSuccess)
        mutationDelivery({
          id: dataSuccess?.id,
          deliveryTypes: data.delivery_types,
        })
          .then((data: any) => console.log(data))
          .catch((err: any) => console.log(err))
        //got to pricing step udating the step to 1

        setCurrentStep(1)
        setCreatedPartnerCompany({
          ...dataSuccess,
          delivery_types: data.delivery_types,
        })
        console.log(dataSuccess)
        return 'Partner Company successfully created'
      },
      error: (err) => {
        return err?.response?.message
      },
    })
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 215px)',
        gap: 2,
      }}
    >
      <Box>
        <Typography sx={{ my: 2 }} color="textPrimary" variant="h4">
          {t('New Delivery Company')}
        </Typography>
      </Box>
      <Stepper
        currentStep={currentStep}
        steps={steps}
        orientation="horizontal"
      />
      <Box sx={{ width: '900px', m: '0 auto' }}>
        {currentStep === 0 && (
          <PartnerCompanyCreationForm onSubmit={createCompany} />
        )}
        {currentStep === 1 && createdPartnerCompany && (
          <PartnerCompanyPricingTypes
            nextStep={() => setCurrentStep(2)}
            partnerCompanyId={createdPartnerCompany.id}
          />
        )}
        {currentStep === 2 && (
          <Box>
            <Button LinkComponent={Link} href="/dashboard/s-partners">
              Go to Delivery Companies
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Page
