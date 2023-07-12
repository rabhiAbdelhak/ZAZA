import { Query } from '@/components/query'
import { Add } from '@mui/icons-material'
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material'
import { MouseEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PartnerCompanyPricingAdd from './partner-company-pricing-add-dialog'
import TypeSelection from './type-selection'
import WilayaAutocomplete from '@/components/WilayaAutocomplete'

type CompProps = {
  selectedPrices: number[]
  isLoading: boolean
  query: string
  filter: PartnerCompanyPricingFilter
  onQueryChange: (newQuery: string) => void
  onFiltersApply: (newFilter: PartnerCompanyPricingFilter) => void
  partnerCompany: PartnerCompany
  currentType?: DeliveryType
  pricing: CommunePricesRow[]
}
const PartnerCompanyPricingFilter = (props: CompProps) => {
  const {
    pricing,
    selectedPrices,
    isLoading,
    onQueryChange,
    query,
    filter,
    partnerCompany,
    currentType,
    onFiltersApply,
  } = props
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null) as any
  const openBulk = Boolean(anchorEl)
  const [openPricingDialog, setOpenPricingDialog] = useState(false)
  const handleClickBulk = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseBulk = () => {
    setAnchorEl(null)
  }

  const handleTypeChange = (newType: number) => {
    onFiltersApply({ ...filter, 'filter[delivery_type_id]': newType })
  }

  const selectedCommunes =
    pricing?.filter((com: CommunePricesRow) =>
      selectedPrices.includes(com.commune_id),
    ) || []

  console.log(selectedCommunes)

  return (
    <Box>
      <Box
        sx={{
          p: 1,
          px: {
            sm: 3,
          },
          width: '100%',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 2,
            width: '100%',
            gridTemplateColumns: {
              sm: 'auto 1fr auto',
              xs: 'auto',
            },
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Button
            id="orders-button"
            variant="outlined"
            disabled={!(selectedPrices.length > 0)}
            sx={{
              order: {
                sm: 1,
                xs: 2,
              },
              width: '200px',
              display: 'flex',
            }}
            aria-controls={openBulk ? 'orders-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openBulk ? 'true' : undefined}
            component="span"
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
                setOpenPricingDialog(true)
                handleCloseBulk()
              }}
            >
              {t('partnerCompany.ChangeSelectedPrices')}({selectedPrices.length}
              )
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
              disabled={isLoading}
              onChange={onQueryChange}
              placeholder={t('SearchInput')}
              value={query}
            />
          </Box>
        </Box>
        <Box sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          {partnerCompany?.delivery_types?.length && (
            <TypeSelection
              types={partnerCompany?.delivery_types}
              currentType={currentType}
              handleChange={handleTypeChange}
              sx={{ flex: 1 }}
            />
          )}
          <WilayaAutocomplete
            filter={filter}
            onChange={(e: any, value: Wilaya) => {
              onFiltersApply({ ...filter, 'filter[wilaya_id]': value.id })
            }}
            label={null}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
      {openPricingDialog && (
        <PartnerCompanyPricingAdd
          type={currentType}
          selectedCommunes={selectedCommunes}
          open={openPricingDialog}
          partnerCompany={partnerCompany}
          handleClose={() => setOpenPricingDialog(false)}
        />
      )}
    </Box>
  )
}

export default PartnerCompanyPricingFilter
