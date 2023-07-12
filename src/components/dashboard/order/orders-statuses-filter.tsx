import { usePopover } from '@/hooks/use-popover'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import OrderStatusesFilterPopper from './order-statuses-filter-poper'

type CompProps = {
  statusList: any
  onApplyFilters: (newFilter: any) => void
  filter: any
}
const OrderStatusesFilter = (props: CompProps) => {
  const { statusList, onApplyFilters, filter } = props
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const { t } = useTranslation()

  return (
    <>
      <Button
        ref={anchorRef}
        variant="outlined"
        color="secondary"
        endIcon={<KeyboardArrowDown />}
        onClick={handleOpen}
        sx={{ width: '130px' }}
      >
        {t('Attributes.Status')}
      </Button>
      <OrderStatusesFilterPopper
        anchorEl={anchorRef.current}
        statusList={statusList}
        open={open}
        handleClose={handleClose}
        onApplyFilters={onApplyFilters}
        filter={filter}
      />
    </>
  )
}

export default OrderStatusesFilter
