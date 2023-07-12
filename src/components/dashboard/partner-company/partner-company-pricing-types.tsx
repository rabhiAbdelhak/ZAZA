import {
  usePartnerCompanyDetailsQuery,
  usePartnerCompanyPricingQuery,
} from '@/queries/partner-company'
import { Box, Button, Card } from '@mui/material'
import { useMemo, useState } from 'react'
import PartnerCompanyPricingFilter from './partner-company-pricing-filter'
import PartnerCompanyPricingTable from './partner-company-pricing-table'
import { useSelection } from '@/hooks/use-selection'
import LoadingDetailsComponent from '@/components/loading-details-component'
import { useTranslation } from 'react-i18next'
import { useCommunesByWialayaQuery } from '@/queries/communes'
type CompProps = {
  nextStep?: () => void
  partnerCompanyId: number
}
const PartnerCompanyPricingTypes = (props: CompProps) => {
  const { partnerCompanyId, nextStep } = props
  const [filter, setFilter] = useState<PartnerCompanyPricingFilter>({
    include: 'commune,delivery_type',
    page: 1,
    'filter[query]': '',
    'filter[wilaya_id]': 16,
    'filter[commune_name]': '',
  })
  const { data: partnerCompany, isLoading: detailsLoading } =
    usePartnerCompanyDetailsQuery(partnerCompanyId)
  console.log(partnerCompany, partnerCompanyId)
  const { data, isLoading, error } = usePartnerCompanyPricingQuery(
    filter,
    partnerCompanyId,
  ) as any

  const { data: communes, isLoading: communesLoading } =
    useCommunesByWialayaQuery(filter['filter[wilaya_id]'])

  const [
    selectedRows,
    handleSelect,
    handleSelectAll,
    handleClearSelected,
    handleSelectOneRow,
  ] = useSelection(data?.data) as any
  const { t } = useTranslation()
  const handleChangePage = (newPage: number) => {
    setFilter((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleChangeQuery = (newQuery: string) => {
    setFilter((prev) => {
      return { ...prev, 'filter[query]': newQuery }
    })
  }

  const handleFiltersApply = (newFilter: PartnerCompanyPricingFilter) => {
    setFilter(newFilter)
  }

  const currentType =
    (partnerCompany &&
      partnerCompany.delivery_types?.find(
        (type) => type.id === filter['filter[delivery_type_id]'],
      )) ||
    (partnerCompany && partnerCompany.delivery_types?.[0])

  const pricingShow = useMemo(() => {
    if (!currentType || !communes) return []
    const newData = communes.map((com: Commune) => {
      let pricingRow: CommunePricesRow = {
        commune_id: com.id,
        price: 0,
        cod_price: 0,
        return_price: 0,
        commune_name: com.name,
        delivery_type_id: currentType?.id,
        delivery_type_name: currentType.name,
      }
      data?.data.forEach((price: CommunePricesRow) => {
        if (price.commune_id === com.id) {
          pricingRow.price = price.price
          pricingRow.cod_price = price.cod_price
          pricingRow.return_price = price.cod_price
        }
      })
      console.log(pricingRow)
      return pricingRow
    })
    return newData
  }, [communes, filter])

  console.log(pricingShow)

  if (
    partnerCompany === undefined ||
    detailsLoading ||
    !partnerCompany?.delivery_types?.length ||
    communesLoading
  ) {
    return <LoadingDetailsComponent />
  }

  return (
    <Box>
      <Card>
        <PartnerCompanyPricingFilter
          pricing={pricingShow}
          partnerCompany={partnerCompany}
          currentType={currentType}
          isLoading={isLoading}
          filter={filter}
          onQueryChange={handleChangeQuery}
          selectedPrices={selectedRows}
          query={filter['filter[query]']}
          onFiltersApply={handleFiltersApply}
        />
        <PartnerCompanyPricingTable
          isLoading={isLoading}
          error={error?.response?.data.message}
          page={data?.meta.current_page}
          pricingCount={data?.meta.total}
          onPageChange={handleChangePage}
          onFiltersApply={handleFiltersApply}
          pageSize={data?.meta.per_page}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          selectedPrices={selectedRows}
          handleSingleRowSelection={handleSelectOneRow}
          filter={filter}
          pricing={pricingShow}
        />
      </Card>
      {nextStep && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" color="primary" onClick={nextStep}>
            {t('Continue')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default PartnerCompanyPricingTypes
