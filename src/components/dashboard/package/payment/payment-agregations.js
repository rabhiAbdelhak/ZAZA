import {
  AutoAwesomeRounded,
  CheckCircleRounded,
  GppBadRounded,
} from '@mui/icons-material'
import { Alert, Box, Skeleton } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { paymentApi } from '../../../../api/payment'
import { useAsync } from '../../../../hooks/useAsync'
import PaymentAgregationBox from './payment-agregation-box'
import { useTranslation } from 'react-i18next'

const PaymentAgregations = () => {
  const {
    data: FetchedAgregations,
    isLoading,
    run,
    error,
  } = useAsync({ status: 'pending', data: [] })

  const fetchAgregations = useCallback(() => {
    run(paymentApi.getPayementAgregations().catch((err) => console.log(err)))
  }, [run])

  useEffect(() => {
    fetchAgregations()
  }, [fetchAgregations])
  const { t } = useTranslation()
  return (
    <>
      {error && <Alert color="error">{t('derrff')}</Alert>}
      {FetchedAgregations && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 5 }}>
          <PaymentAgregationBox
            name="not_ready_packages"
            isLoading={false}
            key={1}
            icon={GppBadRounded}
            color={'warning.main'}
            bgcolor={'#D9822B25'}
            label={t('packages.Total cost of not-ready packages')}
            value={FetchedAgregations.not_ready_packages}
          />
          <PaymentAgregationBox
            name="ready_packages"
            isLoading={false}
            key={1}
            color={'info.main'}
            bgcolor={'#1070CA25'}
            icon={AutoAwesomeRounded}
            value={FetchedAgregations.paid_packages}
            label={t('packages.Total cost of ready packages')}
          />
          <PaymentAgregationBox
            name="paid_packages"
            label={t('packages.Total cost of payed packages')}
            isLoading={false}
            color={'success.main'}
            bgcolor={'#4CAF5025'}
            key={1}
            icon={CheckCircleRounded}
            value={FetchedAgregations.ready_packages}
          />
        </Box>
      )}
    </>
  )
}

export default PaymentAgregations
