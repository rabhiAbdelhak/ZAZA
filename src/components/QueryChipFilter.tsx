import { Box, Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'
import { useTranslation } from 'react-i18next'

function QueryChipFilter({
  title = '',
  label,
  ...chipProps
}: { title?: string } & ChipProps) {
  const { t } = useTranslation()

  if (!label) {
    return null
  }

  const renderLabel = (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <span>
        <span>{title || t('Filters.SearchLabel')}</span>
        <span>{':'}</span>
      </span>
      <span>{label}</span>
    </Box>
  )

  return <Chip label={renderLabel} {...chipProps} />
}

export default QueryChipFilter
