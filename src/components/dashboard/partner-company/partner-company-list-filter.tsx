import { InputField } from '@/components/input-field'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
// import PartnerCompanyForm from './partner-company-form'
import { useState } from 'react'
import { useCreatePartnerCompanyMutation } from '@/queries/partner-company'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Query } from '@/components/query'
import QueryChipFilter from '@/components/QueryChipFilter'

type PartnerCompanyListFilterProps = {
  filter: PartnerCompanyListFilter
  onFilter: (filter: PartnerCompanyListFilter) => void
}

function PartnerCompanyListFilter({
  filter,
  onFilter,
}: PartnerCompanyListFilterProps) {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Query
          value={filter['filter[name]'] || ''}
          placeholder="Search by name.."
          onChange={(search) =>
            onFilter({ ...filter, 'filter[name]': search, page: 0 })
          }
        />
        <QueryChipFilter
          sx={{ mt: 1 }}
          onDelete={() => onFilter({ ...filter, 'filter[name]': '', page: 0 })}
          label={filter['filter[name]']}
        />
      </Box>
      <Button
        LinkComponent={Link}
        href="/dashboard/s-partners/new-partner-company"
        variant="contained"
        startIcon={<AddIcon />}
      >
        {t('Create')}
      </Button>
    </Box>
  )
}

export default PartnerCompanyListFilter
