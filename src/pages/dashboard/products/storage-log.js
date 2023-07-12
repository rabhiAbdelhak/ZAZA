import { Card, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { StorageLogFilter } from '../../../components/dashboard/product/storage-log-filter'
import StorageLogTable from '../../../components/dashboard/product/storage-log-table'
import { useAsync } from '../../../hooks/useAsync'
import * as stockApi from '../../../api/stock'

function StorageLog() {
  const { t } = useTranslation()

  const {
    run,
    isLoading,
    error,
    data: stockLogs,
  } = useAsync({ status: 'pending' })

  const [filter, setFilter] = useState({
    page: 0,
    'filter[name_product]': '',
  })

  const getStocksLog = useCallback(async () => {
    run(stockApi.getStocksLog(filter)).catch(console.error)
  }, [filter, run])

  useEffect(() => {
    getStocksLog()
  }, [getStocksLog])

  const handleQueryChange = (query) => {
    setFilter((prev) => ({ ...prev, 'filter[name_product]': query, page: 0 }))
  }

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }
  return (
    <Container maxWidth={false}>
      <Typography color="textPrimary" variant="h4" sx={{ py: 4 }}>
        {t('storageLog.StorageLog')}
      </Typography>

      <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <StorageLogFilter
          query={filter['filter[name_product]']}
          onQueryChange={handleQueryChange}
        />
        <Divider />
        <StorageLogTable
          error={error}
          storages={stockLogs?.data}
          page={stockLogs?.meta?.current_page}
          onPageChange={handlePageChange}
          pageSize={stockLogs?.meta?.per_page}
          storagesCount={stockLogs?.meta?.total}
          isLoading={isLoading}
        />
      </Card>
    </Container>
  )
}

StorageLog.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default StorageLog
