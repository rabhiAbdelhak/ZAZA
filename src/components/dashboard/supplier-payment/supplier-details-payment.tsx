import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import SupplierPaymentStats from './supplier-payment-stats'
import { useSupplierDetailsPaymentsQuery } from '@/queries/supplier'
import SupplierPaymentDialog from './supplier-payment-dialog'
import { useTranslation } from 'react-i18next'
import SupplierPaymentTable from './supplier-payment-table'
import SupplierPaymentFilter from './supplier-payment-filter'

type SupplierPaymentDetailsProps = {
  supplier?: Supplier
}

const defaultFilter: SupplierPaymentsFilter = {
  'filter[tracking_code]': '',
  'filter[date_from]': '',
  'filter[date_to]': '',
  page: 0,
}

function SupplierDetailsPayment({ supplier }: SupplierPaymentDetailsProps) {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<SupplierPayment>()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)

  const { data, isLoading } = useSupplierDetailsPaymentsQuery(
    supplier?.id,
    filter,
  )

  const handleFilter = (data: Partial<SupplierPaymentsFilter>) =>
    setFilter((prev) => ({ ...prev, ...data, page: 0 }))

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
    <Box>
      <Box sx={{ px: 2, display: 'flex' }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t('Payments')}
        </Typography>
        <Box>
          <Button
            disabled={!supplier?.total_purchase_amount}
            onClick={addPayment}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </Box>

      <SupplierPaymentStats
        payed={supplier?.amount_paid}
        unpaid={supplier?.rest_to_pay}
        totalAmount={supplier?.total_purchase_amount}
        sx={{ mt: 2 }}
      />

      <SupplierPaymentFilter filter={filter} onFilter={handleFilter} />

      <SupplierPaymentTable
        isLoading={isLoading}
        withSupplierColumn={false}
        payments={data?.data}
        filter={filter}
        onFilter={handleFilter}
        page={data?.meta?.current_page || 1}
        pageSize={data?.meta?.per_page || 10}
        rowsCount={data?.meta?.total || 1}
        onEdit={editPayment}
      />

      <SupplierPaymentDialog
        supplierId={supplier?.id}
        open={open}
        initPayment={selectedItem}
        onClose={closeDialog}
        onAddSuccess={successAddHandler}
      />
    </Box>
  )
}

export default SupplierDetailsPayment
