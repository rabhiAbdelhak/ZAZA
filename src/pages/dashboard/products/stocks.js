import { useCallback, useEffect, useState } from 'react'
import { Card, Container, Divider, Typography } from '@mui/material'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { useTranslation } from 'react-i18next'
import StocksFilter from '../../../components/dashboard/product/stock-filter'
import StocksTable from '../../../components/dashboard/product/stocks-table'
import { useSelection } from '../../../hooks/use-selection'
import { useAsync } from '../../../hooks/useAsync'
import * as stockApi from '../../../api/stock'

function Stocks() {
  const [filter, setFilter] = useState({
    page: 0,
    'filter[name]': '',
  })

  const {
    run,
    isLoading,
    error,
    data: stocks,
  } = useAsync({ status: 'pending' })

  const { t } = useTranslation()

  const [selectedStocks, handleSelect, handleSelectAll] = useSelection(
    stocks?.data,
  )

  const handleQueryChange = (newQuery) => {
    setFilter((prev) => ({ ...prev, 'filter[name]': newQuery, page: 0 }))
  }

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  const getStocks = useCallback(async () => {
    run(stockApi.getStocks(filter)).catch(console.error)
  }, [filter, run])

  useEffect(() => {
    getStocks()
  }, [getStocks])

  return (
    <Container
      maxWidth={false}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Typography color="textPrimary" variant="h4" sx={{ py: 4 }}>
        {t('stocks.Stock')}
      </Typography>

      <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <StocksFilter
          onQueryChange={handleQueryChange}
          query={filter['filter[name]']}
        />
        <Divider />
        <StocksTable
          isLoading={isLoading}
          error={error}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          page={stocks?.meta?.current_page}
          onPageChange={handlePageChange}
          pageSize={stocks?.meta?.per_page}
          stocks={stocks?.data}
          stocksCount={stocks?.meta?.total || 0}
          selectedStocks={selectedStocks}
        />
      </Card>
    </Container>
  )
}

Stocks.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Stocks
