import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { dinarFormat } from '@/utils/formats'

type PriceChipFilterProps = {
  min?: string | Date
  max?: string | Date
} & ChipProps

function PriceChipFilter({
  min,
  max,
  label = 'Price',
  ...chipProps
}: PriceChipFilterProps) {
  const { t } = useTranslation()
  const getText = () => {
    let text = t('Attributes.Price') + ' : '
    if (min && !max) {
      text += ` ${t('Filters.MoreThen')} ${dinarFormat(min)}`
      return text
    }

    if (!min && max) {
      text += ` ${t('Filters.LessThen')} ${dinarFormat(max)}`
      return text
    }

    if (min && max) {
      text += ` ${dinarFormat(min)} - ${dinarFormat(max)}`
      return text
    }
    return text
  }
  return min || max ? <Chip label={getText()} {...chipProps} /> : null
}

export default PriceChipFilter
