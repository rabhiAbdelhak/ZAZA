import { NextPageWithLayout } from '../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Typography } from '@mui/material'
import SupplierTable from '@/components/dashboard/supplier/supplier-table'
import { useSuppliersQuery } from '@/queries/supplier'
import SupplierListFilter from '@/components/dashboard/supplier/supplier-list-filter'
import { Scrollbar } from '@/components/scrollbar'
import { useState } from 'react'
import SupplierDrawer from '@/components/dashboard/supplier/supplier-drawer'
import { Pagination } from '@/components/pagination'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { useTranslation } from 'react-i18next'

const defaultFilter: SupplierListFilter = {
  page: 0,
  'filter[name]': '',
}

const Page: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<SupplierListFilter>(defaultFilter)
  const { t } = useTranslation()

  const { data, isLoading } = useSuppliersQuery(filter)

  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem<Supplier>(data?.data)

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
        }}
      >
        <Typography sx={{ my: 2 }} color="textPrimary" variant="h4">
          {t('Suppliers')}
        </Typography>

        <SupplierListFilter filter={filter} onFilter={setFilter} />

        <Scrollbar
          style={{
            height: filter['filter[name]'] ? '52%' : '60%',
          }}
        >
          <SupplierTable
            compact={isOpen}
            isLoading={isLoading}
            data={data?.data}
            onSelectSupplier={setSelectedItem}
            selectedSupplier={selectedItem}
          />
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

      <SupplierDrawer
        onClose={onClose}
        open={isOpen}
        supplier={selectedItem}
        onNext={goNext}
        onPrev={goPrev}
        sx={{ flex: 2, height: '100%' }}
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
