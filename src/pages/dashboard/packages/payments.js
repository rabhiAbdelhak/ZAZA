/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { paymentApi } from '../../../api/payment'

//local imports
import PartnerCompanyPackageVerification from '../../../components/dashboard/partner-company/partner-company-package-verification'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import PaymentAgregations from '../../../components/dashboard/package/payment/payment-agregations'
import PaymentFilters from '../../../components/dashboard/package/payment/payment-filter'
import PaymentTable from '../../../components/dashboard/package/payment/payment-table'
import {
  getPayments,
  setPaymentsPagination,
  setPaymentsQuery,
} from '../../../contexts/global context/actions/payments-actions'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../../contexts/global context/Provider'
import { useSelection } from '../../../hooks/use-selection'
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left'
import {
  useConfirmPaymentMutation,
  useGetPaymentsQuery,
} from '../../../queries/payment'
import Image from 'next/image'

const paymentStatusVariant = [
  {
    id: 0,
    name: {
      ar: '',
      fr: 'Pas encore',
      en: 'Not yet',
    },
    color: 'error.main',
  },
  {
    id: 1,
    name: {
      ar: '',
      fr: 'Reçu',
      en: 'Received',
    },
    color: 'success.main',
  },
  {
    id: 2,
    name: {
      ar: '',
      fr: 'Confirmé',
      en: 'Confirmed',
    },
    color: 'info.main',
  },
  {
    id: 3,
    name: {
      ar: '',
      fr: 'Demandé',
      en: 'Pending',
    },
    color: 'warning.main',
  },
]

const initialFilter = {}

const Payments = () => {
  const { paymentsDispatch: dispatch } = useGlobaleDispatchContext()
  const [filter, setFilter] = useState(initialFilter)
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false)
  const [controller, setController] = useState({
    query: '',
    pagination: { page: 1, perPage: 15 },
  })
  const {
    query,
    pagination: { page, perPage },
  } = controller

  const { data, isLoading, isError, error } = useGetPaymentsQuery({
    ...filter,
    page,
    perPage,
    query,
  })
  const payments = data?.data || []
  const { t } = useTranslation()
  const [selectedPayments, handleSelect, handleSelectAll] =
    useSelection(payments)

  function reinitializePagination() {
    setController((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, page: 1 },
    }))
  }

  const handlePageChange = (newPage) => {
    setController((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, page: newPage },
    }))
  }

  const handleFilterChange = (newFilter) => {
    setFilter((prev) => {
      return newFilter
    })
    reinitializePagination()
  }

  const handleQueryChange = (newQuery) => {
    setController((prev) => {
      return { ...prev, query: newQuery }
    })
    reinitializePagination()
  }

  const mutation = useConfirmPaymentMutation()

  const confirmPayment = (id) => {
    const result = toast.promise(mutation.mutateAsync({ paymentId: id }), {
      loading: t('toast.Saving'),
      success: () => {
        return t('toast.SavedSuccessfully')
      },
      error: (err) => {
        return err?.response?.data?.message
      },
    })
    return result
  }

  return (
    <>
      <Head>
        <title>{t('Payments')}</title>
      </Head>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ paddingBlock: 6, textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        </Box>
      )}
      {!isLoading && !data && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ paddingBlock: 6, textAlign: 'center' }}>
            <Image src={'/server-error.jpg'} height={130} width={130} alt="" />
            <Typography sx={{ fontSize: 34, fontWeight: '800' }}>
              {t('Opps')}
            </Typography>
            <Typography>{t('error_unexpected')}</Typography>
          </Box>
        </Box>
      )}
      {!isLoading && data && (
        <Box sx={{ flexGrow: 1 }}>
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box sx={{ py: 4 }}>
              <Box
                sx={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                }}
              >
                <Typography color="textPrimary" variant="h3">
                  {t('Payments')}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Add />}
                  onClick={() => setOpenVerificationDialog(true)}
                >
                  {t('payments.Add a new payment')}
                </Button>
              </Box>
            </Box>

            <PaymentAgregations />
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              }}
            >
              <PaymentFilters
                isLoading={isLoading}
                error={error?.response?.data?.message}
                query={query}
                selectedPayments={selectedPayments}
                onQueryChange={handleQueryChange}
              />
              <PaymentTable
                paymentStatusVariant={paymentStatusVariant}
                payments={payments}
                isLoading={isLoading}
                error={error?.response?.data?.message}
                onPageChange={handlePageChange}
                selectedPayments={selectedPayments}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                totalPayments={data?.meta?.total}
                page={page}
                pageSize={perPage}
                confirmPayment={confirmPayment}
              />
            </Card>
            <PartnerCompanyPackageVerification
              onClose={() => setOpenVerificationDialog(false)}
              open={openVerificationDialog}
            />
          </Container>
        </Box>
      )}
    </>
  )
}

export default Payments

Payments.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}
