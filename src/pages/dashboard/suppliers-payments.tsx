import { Box, Button, Typography, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useSupplierPaymentsQuery } from '@/queries/supplier'
import { useTranslation } from 'react-i18next'
import { NextPageWithLayout } from '../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import SupplierPaymentFilter from '@/components/dashboard/supplier-payment/supplier-payment-filter'
import SupplierPaymentTable from '@/components/dashboard/supplier-payment/supplier-payment-table'
import SupplierPaymentDialog from '@/components/dashboard/supplier-payment/supplier-payment-dialog'

const defaultFilter: SupplierPaymentsFilter = {
  'filter[tracking_code]': '',
  'filter[date_from]': '',
  'filter[date_to]': '',
  'filter[supplier_name]': '',
  page: 0,
  include: 'supplier ',
}

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<SupplierPayment>()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)

  const { data, isLoading } = useSupplierPaymentsQuery(filter)

  const addPayment = () => {
    setSelectedItem(undefined)
    setOpen(true)
  }

  const editPayment = (item: SupplierPayment) => {
    setSelectedItem(item)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const successAddHandler = () => {
    setFilter(defaultFilter)
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h4">
          {t('Payments')}
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={addPayment}
            startIcon={<AddIcon />}
          >
            {t('Add')}
          </Button>
        </Box>
      </Box>

      <SupplierPaymentFilter filter={filter} onFilter={setFilter} />

      <SupplierPaymentTable
        isLoading={isLoading}
        payments={data?.data}
        filter={filter}
        onFilter={setFilter}
        page={data?.meta?.current_page || 1}
        pageSize={data?.meta?.per_page || 10}
        rowsCount={data?.meta?.total || 1}
        onEdit={editPayment}
      />

      <SupplierPaymentDialog
        withAutoComplete
        supplierId={selectedItem?.supplier_id}
        open={open}
        initPayment={selectedItem}
        onClose={closeDialog}
        onAddSuccess={successAddHandler}
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
