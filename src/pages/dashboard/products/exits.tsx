import { NextPageWithLayout } from '../../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { Pagination } from '@/components/pagination'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { useExitVouchersQuery } from '@/queries/exit-voucher'
import CreateExitVoucher from '@/components/dashboard/product/exit-voucher/create-exit-voucher'
import { Scrollbar } from '@/components/scrollbar'
import { useTranslation } from 'react-i18next'
import ExitVoucherTable from '@/components/dashboard/product/exit-voucher/exit-vouchers-table'
import ExitVoucherDrawer from '@/components/dashboard/product/exit-voucher/exit-voucher-drawer'

const defaultFilter: ExitVoucherFilter = {
  include: 'products,warehouse',
  page: 0,
}

const Page: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<ExitVoucherFilter>(defaultFilter)

  const { data, isLoading } = useExitVouchersQuery(filter)
  console.log(data)
  const { t } = useTranslation()

  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem<ExitVoucher>(data?.data)

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
            {t('Exit Vouchers')}
          </Typography>
          <CreateExitVoucher onSuccess={() => setFilter(defaultFilter)} />
        </Box>

        <Scrollbar
          style={{
            height: '75%',
          }}
        >
          {
            <ExitVoucherTable
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

      <ExitVoucherDrawer
        sx={{ flex: 2 }}
        open={isOpen}
        exitVoucher={selectedItem}
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
