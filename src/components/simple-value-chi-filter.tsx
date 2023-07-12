import { Box, Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'
import { useTranslation } from 'react-i18next'

type CompProps = ChipProps & {
  value: string
}

function SimpleValueChipFilter({ value, label, ...chipProps }: CompProps) {
  const { t } = useTranslation()
  const renderLabel = (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <span>
        <span>{t('Attributes.' + label)}</span>
        <span> {':'} </span>
      </span>
      <span> {value} </span>
    </Box>
  )

  return value ? <Chip label={renderLabel} {...chipProps} /> : null
}

export default SimpleValueChipFilter
