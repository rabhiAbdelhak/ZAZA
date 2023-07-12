import { useState } from 'react'
import Head from 'next/head'
import { Box, Button, Card, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Add, PublishOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

//local imports
import { AuthGuard } from '../../../components/authentication/auth-guard'
import NoData from '../../../components/no-data'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { OrdersFilter } from '../../../components/dashboard/order/orders-filter'
import { OrdersTable } from '../../../components/dashboard/order/orders-table'
import { useSelection } from '../../../hooks/use-selection'
import ImportationDialog from '../../../components/dashboard/dachboard-importation-dialog'
import {
  useAssignOrderMutation,
  useGetOrdersQuery,
  useImportOrdersMutation,
  useUnAssignOrderMutation,
} from '../../../queries/order'
import toast from 'react-hot-toast'
import { statusList } from '../../../constants/order-statuses'
import OrdersMiniTable from '../../../components/dashboard/order/orders-minitable'
import OrderSideDrawer from '../../../components/dashboard/order/order-side-drawer'

const initialFilter = {
  tracking_code: '',
  min_price: 0,
  max_price: 0,
  created_from: '',
  created_to: '',
  status: 'all',
  commune_id: '',
  wilaya_id: '',
  client_phone: '',
  client_first_name: '',
  client_last_name: '',
  assigned_users: [],
  statuses: [],
  product: '',
  source: '',
}

const Orders = () => {
  const [controller, setController] = useState({
    filter: initialFilter,
    query: '',
    sort: 'desc',
    sortBy: 'createdAt',
    pagination: { page: 1, totalPages: 0, perPage: 15 },
  })
  const {
    filter,
    query,
    pagination: { page, perPage },
  } = controller
  const { data, isError, error, isLoading } = useGetOrdersQuery({
    ...filter,
    page,
    perPage,
    query,
  })
  const [openImportationDialog, setOpenImportationDialog] = useState(false)
  const router = useRouter()
  const [importError, setImportError] = useState(null)
  const [isImporting, setIsImporting] = useState(false)
  const [singleSelectedOrderId, setSingleSelectedOrderId] = useState(null)

  const { t } = useTranslation()
  const [
    selectedOrders,
    handleSelect,
    handleSelectAll,
    handleClearSelected,
    handleSelectOneRow,
  ] = useSelection(data?.data)
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleViewChange = (status) => {
    //view change handeling
    setController((prev) => {
      return { ...prev, filter: { ...prev.filter, status } }
    })
  }

  const handleQueryChange = (newQuery) => {
    //query change handeling
    setController((prev) => {
      return { ...prev, query: newQuery }
    })
  }

  const handleFiltersApply = (newFilter) => {
    setController((prevController) => {
      return { ...prevController, filter: newFilter }
    })
  }

  const handleRemoveFilterAttributes = (...args) => {
    setController((prev) => {
      let newFilter = prev.filter
      args.forEach((att) => {
        newFilter[att] = initialFilter[att]
      })
      return { ...prev, filter: newFilter }
    })
  }

  const handleFiltersClear = () => {
    setController((prevController) => {
      return { ...prevController, filter: initialFilter }
    })
  }

  const handlePageChange = (newPage) => {
    setController((prev) => {
      return { ...prev, pagination: { ...prev.pagination, page: newPage } }
    })
  }

  const handleSortChange = (event, property) => {
    const isAsc = controller.sortBy === property && controller.sort === 'asc'

    setController({
      ...controller,
      page: 0,
      sort: isAsc ? 'desc' : 'asc',
      sortBy: property,
    })
  }

  const handleSingleOrderSelection = (id) => {
    setSingleSelectedOrderId(id)
    handleSelectOneRow(id)
  }

  const importMutation = useImportOrdersMutation()
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

  const mutation = useAssignOrderMutation()
  const UnAssignmutation = useUnAssignOrderMutation()

  const handleAssign = (emps, id) => {
    const result = toast.promise(
      mutation.mutateAsync({
        order_ids: [id],
        assigned_users: emps,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          return err?.response?.data?.message
        },
      },
    )
    return result
  }

  const handleUnAssign = (emps, id) => {
    const result = toast.promise(
      UnAssignmutation.mutateAsync({
        order_ids: [id],
        unassigned_users: emps,
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          return err?.response?.data?.message
        },
      },
    )
    return result
  }
  return (
    <>
      <Head>
        <title>{t('Orders Management')}</title>
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
              border: 0,
            }}
          >
            {!openDrawer && (
              <Box sx={{ py: 3, px: 2 }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    flex: 3,
                  }}
                >
                  <Typography color="textPrimary" variant="h4">
                    {t('Orders')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PublishOutlined />}
                      onClick={() => setOpenImportationDialog(true)}
                    >
                      {t('Import Orders')}
                    </Button>
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        router.push('/dashboard/orders/new-ec-order')
                      }
                    >
                      {t('New Order')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
            {data?.data.length !== 0 && (
              <OrdersFilter
                disabled={isLoading}
                filter={filter}
                onFiltersApply={handleFiltersApply}
                onFiltersClear={handleFiltersClear}
                query={query}
                onQueryChange={handleQueryChange}
                onViewChange={handleViewChange}
                selectedOrders={selectedOrders}
                statusList={statusList}
                clearSelected={handleClearSelected}
                openDrawer={openDrawer}
                onRemoveFilterAttribute={handleRemoveFilterAttributes}
              />
            )}

            <Box sx={{ position: 'relative' }}>
              <OrdersMiniTable
                selectedOrderid={singleSelectedOrderId}
                orders={data?.data}
                openDrawer={openDrawer}
                statusList={statusList}
                handleAssign={handleAssign}
                handleUnAssign={handleUnAssign}
                handleSingleOrderSelection={handleSingleOrderSelection}
                isLoading={isLoading}
              />
              {data?.data.length == 0 ? (
                <Box sx={{ paddingTop: 4 }}>
                  <NoData />
                </Box>
              ) : (
                <OrdersTable
                  error={error?.message}
                  isLoading={isLoading}
                  onPageChange={handlePageChange}
                  onSelect={handleSelect}
                  setSingleSelectedOrderId={setSingleSelectedOrderId}
                  onSelectAll={handleSelectAll}
                  onSortChange={handleSortChange}
                  orders={data?.data}
                  ordersCount={data?.meta?.total}
                  page={page}
                  onOpenDrawer={() => setOpenDrawer(true)}
                  pageSize={perPage}
                  totalPages={data?.meta?.to}
                  selectedOrders={selectedOrders}
                  sort={controller.sort}
                  sortBy={controller.sortBy}
                  statusList={statusList}
                  clearSelected={handleClearSelected}
                  onSelectOneRow={handleSelectOneRow}
                  handleAssign={handleAssign}
                  handleUnAssign={handleUnAssign}
                  openDrawer={openDrawer}
                  filter={filter}
                  onFiltersApply={handleFiltersApply}
                />
              )}
            </Box>
          </Card>
          {
            <OrderSideDrawer
              open={openDrawer}
              onClose={() => {
                setOpenDrawer(false)
                handleClearSelected()
              }}
              orderid={singleSelectedOrderId}
              orders={data?.data}
              onSelectSingleOrder={handleSingleOrderSelection}
              sx={{ flex: 2, height: '100%' }}
            />
          }
        </Container>
        <ImportationDialog
          uploading={isImporting}
          importError={importError}
          onClose={() => setOpenImportationDialog(false)}
          open={openImportationDialog}
          entity="Orders"
          initializeImportationErrors={() => setImportError(null)}
          importFile={handleImport}
          template={
            'https://api-manager.zimou.dev/files/order-importation.xlsx'
          }
        />
      </Box>
    </>
  )
}

Orders.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Orders
