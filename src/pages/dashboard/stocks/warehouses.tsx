import { NextPageWithLayout } from '../../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { Pagination } from '@/components/pagination'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { Scrollbar } from '@/components/scrollbar'
import { useTranslation } from 'react-i18next'
import { useWarehousesQuery } from '@/queries/warehouse'
import WarehouseTable from '@/components/dashboard/stocks/warehouse/warehouse-table'
import CreateWarehouse from '@/components/dashboard/stocks/warehouse/create-warehouse'
import WarehouseDrawer from '@/components/dashboard/stocks/warehouse/warehouse-drawer'
const defaultFilter: WarehouseListFilter = {
  include: '',
  page: 1,
}

const Page: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<WarehouseListFilter>(defaultFilter)

  const { data, isLoading } = useWarehousesQuery(filter)
  console.log(data)
  const { t } = useTranslation()

  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem<Warhouse>(data?.data)

  const onPageChange = (page: number) =>
    setFilter((prev) => ({ ...prev, page }))

  const onClose = () => setSelectedItem(undefined)
  const isOpen = Boolean(selectedItem)

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        gap: 2,
        height: 'calc(100vh - 215px)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100%',
          pt: 2,
        }}
      >
        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <Typography color="textPrimary" variant="h4" flexGrow={1}>
            {t('Warehouses')}
          </Typography>
          <CreateWarehouse onSuccess={() => setFilter(defaultFilter)} />
        </Box>

        <Scrollbar
          style={{
            height: '75%',
          }}
        >
          {
            <WarehouseTable
              data={data?.data}
              onSelect={setSelectedItem}
              selected={selectedItem}
              compact={isOpen}
              filter={filter}
              onFilter={setFilter}
            />
          }
        </Scrollbar>

        <Pagination
          sx={{ py: 0 }}
          disabled={isLoading}
          onPageChange={onPageChange}
          page={data?.meta?.current_page || 1}
          pageSize={data?.meta?.per_page || 10}
          rowsCount={data?.meta?.total || 0}
        />
      </Box>

      <WarehouseDrawer
        sx={{ flex: 2 }}
        open={isOpen}
        warehouse={selectedItem}
        onNext={goNext}
        onPrev={goPrev}
        onClose={onClose}
      />
    </Container>
  )
}

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Page
