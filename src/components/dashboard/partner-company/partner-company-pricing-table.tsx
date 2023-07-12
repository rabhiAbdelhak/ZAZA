import { Scrollbar } from '@/components/scrollbar'
import InputFieldFilter from '@/components/input-field-filter'
import {
  Box,
  Checkbox,
  Divider,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  TableBody,
} from '@mui/material'
import { PricingColumns } from '@/constants/tables-columns'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import TableLoading from '@/components/table-loading'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { Pagination } from '@/components/pagination'

type CompProps = {
  pricing: any
  selectedPrices: any[]
  page?: number
  pageSize?: number
  sortBy?: string
  onSelectAll: (event: ChangeEvent, idAttr?: string) => void
  onSelect: (event: ChangeEvent, rowId: number) => void
  isLoading: boolean
  handleSingleRowSelection: (id: number) => void
  error: any
  onPageChange: (newPage: number) => void
  pricingCount?: number
  filter: PartnerCompanyPricingFilter
  onFiltersApply: (filter: PartnerCompanyPricingFilter) => void
}

const PartnerCompanyPricingTable = (props: CompProps) => {
  const {
    pricing,
    page,
    pageSize,
    isLoading,
    selectedPrices,
    onFiltersApply,
    filter,
    onSelectAll,
    onSelect,
    sortBy,
    onPageChange,
    pricingCount,
    handleSingleRowSelection,
    error,
  } = props
  const { t } = useTranslation()

  //table content conditions
  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !pricing.length)
  const displayData = Boolean(!isLoading && !error && pricing.length)

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
      }}
    >
      <Divider />
      <Scrollbar>
        <TableContainer>
          <Table sx={{ minWidth: 1000 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ bgcolor: 'neutral.50' }}>
                  <Checkbox
                    checked={
                      pricing.length > 0 &&
                      selectedPrices.length === pricing.length
                    }
                    disabled={isLoading}
                    indeterminate={
                      selectedPrices.length > 0 &&
                      selectedPrices.length < pricing.length
                    }
                    onChange={(event: ChangeEvent) =>
                      //here we passe the id attribute as commune_idto the select all method in order to use it as an identifier
                      onSelectAll(event, 'commune_id')
                    }
                  />
                </TableCell>
                {PricingColumns?.map((column) => (
                  <TableCell key={column.id} sx={{ bgcolor: 'neutral.50' }}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      //direction={sortBy === column.id ? sort  : 'asc'}
                      disabled={isLoading}
                      //onClick={(event) => onSortChange(event, column.id)}
                    >
                      <Typography noWrap variant="inherit">
                        {t('Attributes.' + column.label)}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ bgcolor: 'neutral.50' }} />
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell sx={{ px: 2, py: 1 }}>
                  <InputFieldFilter
                    value={filter['filter[commune_name]']}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      onFiltersApply({
                        ...filter,
                        'filter[commune_name]': event.target.value,
                      })
                    }
                    placeholder={t('Attributes.Town')}
                    fullWidth
                    onClear={() =>
                      onFiltersApply({ ...filter, 'filter[commune_name]': '' })
                    }
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {displayData && (
              <TableBody>
                {pricing.map((priceRow: CommunePricesRow) => {
                  return (
                    <TableRow
                      hover
                      sx={{
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        handleSingleRowSelection(priceRow.commune_id)
                      }
                      key={priceRow.commune_id}
                      selected={
                        !!selectedPrices.find(
                          (selectedOrder) =>
                            selectedOrder === priceRow?.commune_id,
                        )
                      }
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={
                            !!selectedPrices.find(
                              (SelectedCommunePrice: number) =>
                                SelectedCommunePrice === priceRow.commune_id,
                            )
                          }
                          onChange={(event) =>
                            onSelect(event, priceRow.commune_id)
                          }
                          onClick={(event) => event.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" color="inherit">
                          {' '}
                          {`${priceRow.commune_name}`}
                        </Typography>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Typography variant="inherit" color="inherit">
                          {' '}
                          {`${priceRow.price}`}
                        </Typography>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Typography variant="inherit" color="inherit">
                          {' '}
                          {`${priceRow.cod_price}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" color="inherit">
                          {' '}
                          {`${priceRow.return_price}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      {displayLoading && <TableLoading />}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        pageSize={pageSize}
        rowsCount={pricingCount}
      />
    </Box>
  )
}

export default PartnerCompanyPricingTable
