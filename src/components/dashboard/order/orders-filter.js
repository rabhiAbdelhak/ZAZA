import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Divider, Menu, MenuItem, Tab, Tabs } from '@mui/material'
import { Adjustments as AdjustmentsIcon } from '../../../icons/adjustments'
import { Query } from '../../query'
import { Add } from '@mui/icons-material'
import OrderUpdateStatusDialog from './order-update-status-dialog'
import { OrderFilterDialog } from './order-filter-dialog'
import AssignToUserDialog from './orders-assign-user-dialog'
import { useTranslation } from 'react-i18next'
import { orderApi } from '../../../api/order'
import { format } from 'date-fns'
import DateChipFilter from '../../../components/DateChipFilter'
import SimpleValueChipFilter from '../../../components/simple-value-chi-filter'
import PriceChipFilter from '../../../components/PriceChipFilter'
import WilayaChipFilter from '../../../components/WialayaChipFiler'

export const OrdersFilter = (props) => {
  const {
    disabled,
    filter,
    onFiltersApply,
    onFiltersClear,
    onQueryChange,
    onViewChange,
    query,
    statusList,
    selectedOrders,
    clearSelected,
    openDrawer,
    onRemoveFilterAttribute,
  } = props
  const { t } = useTranslation()
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false)
  const [openAssignToUserDialog, setOpenAssignToUserDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const openBulk = Boolean(anchorEl)

  const handleClickBulk = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseBulk = () => {
    setAnchorEl(null)
  }

  const handleExportOrders = () => {
    orderApi
      .exportOrders(selectedOrders)
      .then((data) => {
        const href = URL.createObjectURL(data)

        // // create 'a' HTML element with href to file & click
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'file.xlsx') //or any other extension
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const CreatedTo = filter.created_to
    ? format(new Date(filter.created_to), 'dd MMM yyyy')
    : null
  const CreatedFrom = filter.created_from
    ? format(new Date(filter.created_from), 'dd MMM yyyy')
    : null
  return (
    <>
      <div>
        <Box
          sx={{
            px: {
              sm: 3,
            },
            width: openDrawer ? '100%' : 'auto',
          }}
        >
          {/* <Tabs
            onChange={(event, value) => onViewChange?.(value)}
            allowScrollButtonsMobile
            value={filter.status}
            variant="scrollable"
          >
            <Tab disabled={disabled} label="All" value="all" />
            {statusList.map((option) => (
              <Tab
                disabled={disabled}
                key={option.id}
                label={t(option.name)}
                value={option.id}
              />
            ))}
          </Tabs> */}
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 2,
            width: openDrawer ? '100%' : 'auto',
            gridTemplateColumns: {
              sm: 'auto 1fr auto',
              xs: 'auto',
            },
            justifyContent: 'space-between',
            py: 2,
            px: 1,
          }}
        >
          <Button
            id="orders-button"
            disabled={!(selectedOrders.length > 0)}
            sx={{
              order: {
                sm: 1,
                xs: 2,
              },
              width: '200px',
              display: openDrawer ? 'none' : 'flex',
            }}
            aria-controls={openBulk ? 'orders-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openBulk ? 'true' : undefined}
            onClick={handleClickBulk}
            startIcon={<Add />}
          >
            {t('Bulk Action')}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openBulk}
            onClose={handleCloseBulk}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenUpdateStatusDialog(true)
                handleCloseBulk()
              }}
            >
              {t('orders.Change status for selected')}({selectedOrders.length})
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenAssignToUserDialog(true)
                handleCloseBulk()
              }}
            >
              {t('orders.Assign selected to user')}({selectedOrders.length})
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleExportOrders()
                handleCloseBulk()
              }}
            >
              {t('orders.Export selected orders')}({selectedOrders.length})
            </MenuItem>
          </Menu>
          <Box
            sx={{
              width: '100%',
              flex: 1,
              order: {
                sm: 2,
                xs: 1,
              },
            }}
          >
            <Query
              disabled={disabled}
              onChange={onQueryChange}
              placeholder={t('SearchInput')}
              value={query}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
                mt: 1,
              }}
            >
              {(filter.created_from || filter.created_to) && (
                <DateChipFilter
                  startDate={filter.created_from}
                  endDate={filter.created_to}
                  onDelete={() =>
                    onRemoveFilterAttribute('created_to', 'created_from')
                  }
                />
              )}
              <SimpleValueChipFilter
                value={filter.client_first_name}
                label={t('Attributes.First Name')}
                onDelete={() => onRemoveFilterAttribute('client_first_name')}
              />
              <SimpleValueChipFilter
                value={filter.order_id}
                label={t('Attributes.Order ID')}
                onDelete={() => onRemoveFilterAttribute('order_id')}
              />
              <SimpleValueChipFilter
                value={filter.client_last_name}
                label={t('Attributes.Last Name')}
                onDelete={() => onRemoveFilterAttribute('client_last_name')}
              />
              <SimpleValueChipFilter
                value={filter.source}
                label={t('Attributes.Lead Source')}
                onDelete={() => onRemoveFilterAttribute('source')}
              />
              <SimpleValueChipFilter
                value={filter.product}
                label={t('Attributes.Product Name')}
                onDelete={() => onRemoveFilterAttribute('product')}
              />
              <SimpleValueChipFilter
                value={filter.client_phone}
                label={t('Attributes.Phone Number')}
                onDelete={() => onRemoveFilterAttribute('client_phone')}
              />
              <PriceChipFilter
                min={filter.min_price}
                max={filter.max_price}
                onDelete={() =>
                  onRemoveFilterAttribute('min_price', 'max_price')
                }
              />
              <WilayaChipFilter
                wilayaid={filter.wilaya_id}
                commune_id={filter.commune_id}
                onDelete={() =>
                  onRemoveFilterAttribute('wilaya_id', 'commune_id')
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              order: 3,
            }}
          >
            <Button
              color="primary"
              disabled={disabled}
              onClick={() => setOpenFilterDialog(true)}
              startIcon={<AdjustmentsIcon />}
              size="large"
              sx={{
                order: 3,
                color: 'primary',
              }}
              variant={'text'}
            >
              {t('Filters.Filter')}
            </Button>
          </Box>
        </Box>
      </div>
      <OrderFilterDialog
        onFiltersApply={onFiltersApply}
        onFiltersClear={onFiltersClear}
        filter={filter}
        onClose={() => setOpenFilterDialog(false)}
        open={openFilterDialog}
      />
      <OrderUpdateStatusDialog
        selectedOrders={selectedOrders}
        onClose={() => setOpenUpdateStatusDialog(false)}
        open={openUpdateStatusDialog}
      />
      <AssignToUserDialog
        clearSelected={clearSelected}
        open={openAssignToUserDialog}
        onClose={() => setOpenAssignToUserDialog(false)}
        selectedOrders={selectedOrders}
      />
    </>
  )
}

OrdersFilter.defaultProps = {
  filter: {},
  selectedOrders: [],
  view: 'all',
}

OrdersFilter.propTypes = {
  disabled: PropTypes.bool,
  filter: PropTypes.object,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selectedOrders: PropTypes.array,
  view: PropTypes.string,
}
