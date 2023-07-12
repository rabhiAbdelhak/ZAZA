import { Box, Button, Divider } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Adjustments } from '../../../icons/adjustments'
import { Query } from '../../query'
import PackageBulkActions from './package-bulk-actions'
import PackageFilterDialog from './package-filter-dialog'
import PackageSituationFilter from './package-situation-filter'
import QueryChipFilter from '../../QueryChipFilter'
import DateChipFilter from '../../DateChipFilter'

const PackagesFilter = (props) => {
  const {
    isAppliedFilter,
    selectedPackages,
    isLoading,
    onPrint,
    filter,
    onFilter,
  } = props
  const { t } = useTranslation()
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const disabled = !selectedPackages || selectedPackages.length === 0

  const handleFilter = (newFilter) => {
    if (onFilter) {
      onFilter({ ...filter, ...newFilter, page: 0 })
    }
  }

  return (
    <div>
      <Box sx={{ px: { sm: 3 } }}>
        <PackageSituationFilter filter={filter} onFilter={handleFilter} />
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'grid',
          gap: 2,
          justifyContent: 'flex-start',
          gridTemplateColumns: {
            sm: 'auto 1fr auto',
            xs: 'auto',
          },
          justifyItems: 'flex-start',
          p: 3,
        }}
      >
        <PackageBulkActions
          onPrint={onPrint}
          selectedPackages={selectedPackages}
          disabled={disabled}
        />
        <Box
          sx={{
            width: '100%',
            order: {
              sm: 2,
              xs: 1,
            },
          }}
        >
          <Query
            disabled={isLoading}
            onChange={(search) => handleFilter({ query: search })}
            sx={{
              order: {
                sm: 2,
                xs: 1,
              },
            }}
            value={filter?.query}
            placeholder={t(
              'packages.Search tracking code, client name, or client number.',
            )}
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
            <QueryChipFilter
              label={filter.query}
              onDelete={() => handleFilter({ query: '' })}
            />
            <DateChipFilter
              label={t('Attributes.Created date')}
              startDate={filter.created_from}
              endDate={filter.created_to}
              onDelete={() =>
                handleFilter({ created_to: '', created_from: '' })
              }
            />
            <QueryChipFilter
              title="type"
              label={filter?.type?.name}
              onDelete={() => handleFilter({ type: '' })}
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
            disabled={isLoading}
            onClick={() => setOpenFilterDialog(true)}
            startIcon={<Adjustments />}
            size="large"
            sx={{
              order: 3,
              color: isAppliedFilter ? 'primary.contrast' : 'primary',
            }}
            variant={isAppliedFilter ? 'contained' : 'text'}
          >
            {t('Filters.Filter')}
          </Button>
          <PackageFilterDialog
            filter={filter}
            onChangeFilter={handleFilter}
            open={openFilterDialog}
            onClose={() => setOpenFilterDialog(false)}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </div>
  )
}

export default PackagesFilter
