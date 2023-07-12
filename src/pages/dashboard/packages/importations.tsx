import ImportationTable from '@/components/dashboard/package/importation/importation-table'
import { usePackagesImportationListQuery } from '@/queries/importation'
import { Card, Dialog, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { t } from 'i18next'
import { useCallback, useState } from 'react'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { NextPageWithLayout } from '../../_app'
import ResizableDrawer, {
  ResizableDrawerToolbar,
} from '@/components/ResizableDrawer'
import ImportationDetail from '@/components/dashboard/package/importation/importation-detail'
import ImportationFilter from '@/components/dashboard/package/importation/importation-filter'
import ImportationPrint from '@/components/dashboard/package/importation/importation-print'

const defaultFilter: PackageImportationListFilter = {
  include: 'packagesCount',
  'filter[id]': '',
  page: 1,
  'filter[created_from]': '',
  'filter[created_to]': '',
}

const Importations: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<
    PackageImportationListFilter | undefined
  >(defaultFilter)
  const { data, isLoading, error } = usePackagesImportationListQuery(filter)

  const changePageHandler = useCallback(
    (page: number) => setFilter((prev) => ({ ...prev, page })),
    [],
  )

  const [importationDetailId, setDetailImportationId] = useState<number>()
  const [importationPrintId, setImportationPrintId] = useState<number>()

  const onShowDetailHandler = (item: PackageImportationListItem) => {
    setDetailImportationId(item.id)
  }

  const closeDetailsDrawer = () => setDetailImportationId(undefined)

  const onShowPrint = (item: PackageImportationListItem) => {
    setImportationPrintId(item.id)
  }

  const closePrint = () => setImportationPrintId(undefined)

  const goNextHandler = () => {
    const index =
      data?.data.findIndex((el) => el.id === importationDetailId) || 0
    const nextItem = data?.data[index + 1]
      ? data?.data[index + 1]
      : data?.data[0]
    setDetailImportationId(nextItem?.id)
  }

  const goPrevHandler = () => {
    const index =
      data?.data.findIndex((el) => el.id === importationDetailId) || 0
    const nextItem = data?.data[index - 1]
      ? data?.data[index - 1]
      : data?.data[0]
    setDetailImportationId(nextItem?.id)
  }

  return (
    <Container
      maxWidth={false}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'space-between',
          py: 4,
        }}
      >
        <Typography color="textPrimary" variant="h4" mb={2}>
          {t('Importation.PackageImportations')}
        </Typography>
      </Box>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <ImportationFilter filter={filter} onFilter={setFilter} />
        <ImportationTable
          isLoading={isLoading}
          error={error as any}
          items={data?.data}
          pageSize={data?.meta.per_page}
          page={data?.meta?.current_page}
          totalItems={data?.meta?.total}
          onPageChange={changePageHandler}
          onShowDetail={onShowDetailHandler}
          onPrint={onShowPrint}
        />
      </Card>

      <ResizableDrawer
        open={!!importationDetailId}
        minDrawerWidth={1200}
        maxDrawerWidth={1200}
      >
        <ResizableDrawerToolbar
          onClose={closeDetailsDrawer}
          onGoNext={goNextHandler}
          onGoPrev={goPrevHandler}
          fullScreenPath=""
          disabled={false}
          actions={undefined}
          sx={undefined}
        />
        <ImportationDetail importationId={importationDetailId} />
      </ResizableDrawer>

      <Dialog maxWidth="lg" fullWidth open={Boolean(importationPrintId)}>
        <ImportationPrint
          importationId={importationPrintId}
          onClose={closePrint}
        />
      </Dialog>
    </Container>
  )
}

export default Importations

Importations.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}
