import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Query } from '@/components/query'
import { Adjustments as AdjustmentsIcon } from '@/icons/adjustments'
import ImportationDialogFilter from './importation-dialog-filter'
import DateChipFilter from '@/components/DateChipFilter'
import QueryChipFilter from '@/components/QueryChipFilter'

type ImportationFilterProps = {
  isLoading?: boolean
  filter?: PackageImportationListFilter
  onFilter: (filter?: PackageImportationListFilter) => void
}

const ImportationFilter = (props: ImportationFilterProps) => {
  const { isLoading = false, onFilter, filter } = props
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const hasDateFilter = Boolean(
    filter?.['filter[created_from]'] || filter?.['filter[created_to]'],
  )

  const hasSearch = Boolean(filter?.['filter[id]'])

  const clearDateFilter = () => {
    onFilter({
      ...filter,
      'filter[created_from]': '',
      'filter[created_to]': '',
    })
  }

  const onQueryChange = (search: string) => {
    onFilter({
      ...filter,
      'filter[id]': search,
    })
  }

  const handleFilter = (newFilter?: PackageImportationListFilter) => {
    onFilter({ ...filter, ...newFilter })
  }

  return (
    <Box sx={{ px: { sm: 3 }, py: 2 }}>
      <Box display="flex" gap={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Query
            disabled={isLoading}
            onChange={onQueryChange}
            placeholder={t('Importation.SearchByRef')}
            value={filter?.['filter[id]'] || ''}
          />
          {(hasDateFilter || hasSearch) && (
            <Box sx={{ mt: 2, display: 'flex', flexFlow: 'wrap', gap: 2 }}>
              {hasSearch && (
                <QueryChipFilter
                  label={filter?.['filter[id]'] || ''}
                  onDelete={() => onQueryChange('')}
                />
              )}
              {hasDateFilter && (
                <DateChipFilter
                  startDate={filter?.['filter[created_from]']}
                  endDate={filter?.['filter[created_to]']}
                  onDelete={clearDateFilter}
                />
              )}
            </Box>
          )}
        </Box>

        <Box>
          <Button
            color="primary"
            onClick={toggleOpen}
            startIcon={<AdjustmentsIcon />}
            size="large"
          >
            {t('Filters.Filter')}
          </Button>
        </Box>
      </Box>

      <ImportationDialogFilter
        onFilter={handleFilter}
        open={open}
        filter={filter}
        onClose={toggleOpen}
      />
    </Box>
  )
}

export default ImportationFilter
