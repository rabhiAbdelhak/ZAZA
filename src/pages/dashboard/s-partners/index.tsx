import { NextPageWithLayout } from '../../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Box, Container, Typography } from '@mui/material'
import PartnerCompanyTable from '@/components/dashboard/partner-company/partner-company-table'
import { usePartnerCompanysQuery } from '@/queries/partner-company'
import PartnerCompanyFilter from '@/components/dashboard/partner-company/partner-company-list-filter'
import { Scrollbar } from '@/components/scrollbar'
import { useState } from 'react'
import { Pagination } from '@/components/pagination'
import useSelectedListItem from '@/hooks/useSelectedListItem'
import { useTranslation } from 'react-i18next'
import PartnerCompanyDrawer from '@/components/dashboard/partner-company/partner-company-drawer'

const defaultFilter: PartnerCompanyListFilter = {
  page: 0,
  'filter[name]': '',
  'filter[phone]': '',
  'filter[store_name]': '',
}

const Page: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<PartnerCompanyListFilter>(defaultFilter)

  const { t } = useTranslation()

  const { data, isLoading } = usePartnerCompanysQuery(filter) as any

  const { selectedItem, setSelectedItem, goNext, goPrev } =
    useSelectedListItem<PartnerCompany>(data?.data)

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
          {t('Delivery Companies')}
        </Typography>

        <PartnerCompanyFilter filter={filter} onFilter={setFilter} />
        <Scrollbar
          style={{
            height: filter['filter[name]'] ? '52%' : '60%',
          }}
        >
          <PartnerCompanyTable
            compact={isOpen}
            isLoading={isLoading}
            data={data?.data}
            onSelectPartnerCompany={setSelectedItem}
            selectedPartnerCompany={selectedItem}
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

      {
        <PartnerCompanyDrawer
          onClose={onClose}
          open={isOpen}
          partnerCompany={selectedItem}
          onNext={goNext}
          onPrev={goPrev}
          sx={{ flex: 2, height: '100%' }}
        />
      }
    </Container>
  )
}

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Page
