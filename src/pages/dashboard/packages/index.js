import { Add, PublishOutlined } from '@mui/icons-material'
import { Box, Button, Card, Container, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import ImportationDialog from '../../../components/dashboard/dachboard-importation-dialog'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import PackagesFilter from '../../../components/dashboard/package/package-filter'
import PackagesTable from '../../../components/dashboard/package/package-table'
import PackageSideDrawer from '../../../components/dashboard/package/package-side-drawer'
import PackagePrintModal from '../../../components/dashboard/package/PackagePrintModal'
import {
  paymentStatusVariants,
  situationsVariant,
  statusVariants,
} from '../../../constants/pacakges-statuses'
import { useSelection } from '../../../hooks/use-selection'
import {
  useGetPackagesQuery,
  useImportPackagesMutation,
} from '../../../queries/package'
import Router from 'next/router'

const defaultFilter = {
  include: 'status,commune.wilaya,delivery_type',
  query: '',
  trackingCode: '',
  productName: '',
  clientPhone: '',
  clientName: '',
  statusId: '',
  paymentStatus: '',
  deliveryType: '',
  wilaya: '',
  situationId: '',
  subSituationId: '',
  commune_id: '',
  created_to: '',
  created_from: '',
  updated_to: '',
  updated_from: '',
  type: '',
  page: 0,
  echange: '',
}
const Packages = () => {
  const [importError, setImportError] = useState(null)
  const [isImporting, setIsImporting] = useState(false)

  const [openImportationDialog, setOpenImportationDialog] = useState(false)

  const { t } = useTranslation()
  const [print, setPrint] = useState(null)
  const [filter, setFilter] = useState(defaultFilter)
  const [openDrawer, setOpenDrawer] = useState(false)

  const formattedFilter = useMemo(
    () => ({
      include: filter.include,
      'filter[query]': filter.query,
      'filter[product_name]': filter.productName,
      'filter[tracking_code]': filter.trackingCode,
      'filter[client_phone]': filter.clientPhone,
      'filter[client_name]': filter.clientName,
      'filter[status_id]': filter?.statusId || '',
      'filter[store_payment_status]': filter.paymentStatus?.id || '',
      'filter[delivery_type_id]': filter.deliveryType?.id || '',
      'filter[wilaya_id]': filter?.wilaya?.id || '',
      'filter[commune_id]': filter?.commune_id || '',
      'filter[created_to]': filter?.created_to || '',
      'filter[created_from]': filter?.created_from || '',
      'filter[updated_to]': filter?.updated_to || '',
      'filter[updated_from]': filter?.updated_from || '',
      'filter[type]': filter?.type?.id || '',
      'filter[situation_id]':
        filter?.subSituationId || filter.situationId || '',
      'filter[tracking_code_exchange]': filter.echange,
    }),
    [filter],
  )

  const { data, isLoading, isError, error } =
    useGetPackagesQuery(formattedFilter)

  const [singleSelectedPackageId, SetSingleSelectedPackageId] = useState(null)

  const [
    selectedPackages,
    handleSelect,
    handleSelectAll,
    handleClearSelected,
    handleSelectOneRow,
  ] = useSelection(data?.data || [])

  const openPrint = (printData) => {
    const printIds = printData
      ? Array.isArray(printData)
        ? printData
        : [printData]
      : []
    const formatedData =
      data?.data?.filter((el) => printIds.includes(el.id)) || []
    setPrint(formatedData)
  }

  const closePrint = () => {
    setPrint(null)
  }

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  const handleSortChange = (event, property) => {
    //gonna put our logic here
    return null
  }

  const importMutation = useImportPackagesMutation()
  const handleImport = (formData) => {
    setIsImporting(true)
    return (
      importMutation.mutateAsync(formData).then((data) => {
        if (data.data) {
          setIsImporting(false)
          toast.success('You imported some orders')
        } else {
          setImportError(data.error)
          setIsImporting(false)
        }
      }),
      {}
    )
  }
  const handleSinglePackageSelection = (id) => {
    SetSingleSelectedPackageId(id)
    handleSelectOneRow(id)
  }
  return (
    <>
      <Head>
        <title>{t('packages.Packages Management')}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            gap: 2,
            height: 'calc(100vh - 215px)',
            overflow: 'hidden',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flex: 1,
            }}
          >
            {!openDrawer && (
              <Box
                sx={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                }}
              >
                <Typography color="textPrimary" variant="h4" mb={2}>
                  {t('Packages')}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginInline: 1 }}
                    startIcon={<PublishOutlined />}
                    onClick={() => setOpenImportationDialog(true)}
                  >
                    {t('packages.Import Packages')}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() =>
                      Router.push(`/dashboard/packages/new-package`)
                    }
                  >
                    {t('packages.New Package')}
                  </Button>
                </Box>
              </Box>
            )}
            <PackagesFilter
              // situations={stats?.data}
              isAppliedFilter={false}
              selectedPackages={selectedPackages}
              onPrint={() => openPrint(selectedPackages)}
              isLoading={isLoading}
              onChangeFilter={() => {}}
              filter={filter}
              onFilter={setFilter}
              onViewChange={() => {}}
              onStatusChange={() => {}}
              onQueryChange={() => {}}
              query={''}
              situationsVariant={situationsVariant}
              statusVariants={statusVariants}
              clearSelected={() => {}}
              onRemoveFilterAttribute={() => {}}
            />

            <PackagesTable
              onPrint={openPrint}
              packages={data?.data || []}
              isLoading={isLoading}
              SetSingleSelectedPackageId={SetSingleSelectedPackageId}
              isError={isError}
              openDrawer={openDrawer}
              onOpenDrawer={() => setOpenDrawer(true)}
              error={error?.response?.data?.message}
              onSortChange={handleSortChange}
              page={data?.meta?.current_page}
              pageSize={data?.meta?.per_page}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              selectedPackages={selectedPackages}
              onPageChange={handlePageChange}
              totalPackages={data?.meta?.total}
              situationsVariant={situationsVariant}
              paymentStatusVariants={paymentStatusVariants}
              statusVariants={statusVariants}
              clearSelected={handleClearSelected}
              filter={filter}
              onFilter={setFilter}
            />
          </Card>
          <PackageSideDrawer
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(false)
              handleClearSelected()
            }}
            packid={singleSelectedPackageId}
            packages={data?.data}
            onSelectSinglePackage={handleSinglePackageSelection}
            sx={{ flex: 2, height: '100%' }}
          />
          <ImportationDialog
            uploading={isImporting}
            importError={importError}
            onClose={() => setOpenImportationDialog(false)}
            open={openImportationDialog}
            entity="Packages"
            importFile={handleImport}
            initializeImportationErrors={() => setImportError(null)}
            template={
              'https://api-manager.zimou.dev/files/package-importation.xlsx'
            }
          />

          <PackagePrintModal
            open={Boolean(print)}
            data={print}
            onClose={closePrint}
          />
        </Container>
      </Box>
    </>
  )
}

export default Packages

Packages.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}
