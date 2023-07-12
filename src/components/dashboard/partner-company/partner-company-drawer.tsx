import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import {
  usePartnerCompanyDetailsQuery,
  useUpdatePartnerCompanyMutation,
} from '@/queries/partner-company'
import { Box, Typography, Divider, Card, Button } from '@mui/material'
import SupplierPaymentStats from '../supplier-payment/supplier-payment-stats'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import PartnerCompanyDetailSkeleton from './partner-company-details-skelton'
import PartnerCompanyInfoCard from './partner-company-info-card'
import PartnerCompanyPricingTypes from './partner-company-pricing-types'
import { useState } from 'react'
import PartnerCompanypricingModal from './partner-company-pricing-modal'

type PartnerCompanyDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps & {
    partnerCompany?: PartnerCompany
  }

function PartnerCompanyDrawer({
  open = false,
  onClose,
  onNext,
  onPrev,
  sx,
  partnerCompany,
}: PartnerCompanyDrawerProps) {
  const {
    data: fetched,
    isLoading,
    isSuccess,
    isError,
  } = usePartnerCompanyDetailsQuery(partnerCompany?.id)
  const mutation = useUpdatePartnerCompanyMutation()
  const { t } = useTranslation()
  const [openPricingDialog, setOpenPricingDialog] = useState(false)

  const onUpdate = (data: Partial<PartnerCompany>, helpers: any) => {
    const valuesToUpdate: Partial<PartnerCompany> = {
      name: fetched?.name,
      phone: fetched?.phone,
      ...data,
    }
    return toast.promise(
      mutation.mutateAsync({
        ...valuesToUpdate,
        id: partnerCompany?.societe_partenaire?.id,
      }),
      {
        loading: t('toast.Saving'),
        success: (d) => {
          return t('toast.SavedSuccessfully')
        },
        error: (err: any) => {
          return err?.response?.data?.message || ''
        },
      },
    )
  }
  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={onNext}
        onPrev={onPrev}
        disabled={mutation.isLoading}
        onClose={onClose}
      />
      {isLoading && <PartnerCompanyDetailSkeleton />}
      {!isLoading && fetched && partnerCompany && (
        <Box
          sx={{
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <PartnerCompanyInfoCard
            partnerCompany={fetched}
            onUpdate={onUpdate}
            Editable
          />

          <Box sx={{ px: 2, pt: 2, display: 'flex' }}>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {t('Payments')}
            </Typography>
          </Box>

          <SupplierPaymentStats
            payed={fetched?.recieved_payments}
            unpaid={fetched?.pending_payments}
            totalAmount={fetched?.total_payments}
            sx={{ mt: 2 }}
          />
          <Divider />
          <Card sx={{ py: 3, px: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenPricingDialog(true)}
            >
              Controlling the delivery pricing
            </Button>
          </Card>
        </Box>
      )}
      {openPricingDialog && partnerCompany && (
        <PartnerCompanypricingModal
          open={openPricingDialog}
          partnerCompany={partnerCompany}
          onClose={() => setOpenPricingDialog(false)}
        />
      )}
    </InternalDrawer>
  )
}

export default PartnerCompanyDrawer
