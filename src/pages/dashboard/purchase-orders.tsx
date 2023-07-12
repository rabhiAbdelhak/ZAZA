import { NextPageWithLayout } from '../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { Pagination } from '@/components/pagination'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { usePurchaseOrderQuery } from '@/queries/purchase-orders'
import PurchaseOrderTable from '@/components/dashboard/pruchase-order/purchase-order-table'
import CreatePurchaseOrder from '@/components/dashboard/pruchase-order/create-purchase-order'
import PurchaseOrderDrawer from '@/components/dashboard/pruchase-order/purchase-order-drawer'
import { Scrollbar } from '@/components/scrollbar'

const defaultFilter: PurchaseOrderFilter = {
  include: 'products,supplier',
  page: 1,
}

const Page: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<PurchaseOrderFilter>(defaultFilter)

  const { data, isLoading } = usePurchaseOrderQuery(filter)

  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem<PurchaseOrder>(data?.data)

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
            {'Purchase order'}
          </Typography>
          <CreatePurchaseOrder onSuccess={() => setFilter(defaultFilter)} />
        </Box>

        <Scrollbar
          style={{
            height: '75%',
          }}
        >
          <PurchaseOrderTable
            data={data?.data}
            onSelect={setSelectedItem}
            selected={selectedItem}
            compact={isOpen}
            filter={filter}
            onFilter={setFilter}
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

      <PurchaseOrderDrawer
        sx={{ flex: 2 }}
        open={isOpen}
        purchaseOrder={selectedItem}
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
