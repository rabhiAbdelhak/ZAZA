import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

type DateChipFilterProps = {
  startDate?: string | Date
  endDate?: string | Date
} & ChipProps

function DateChipFilter({
  startDate,
  endDate,
  label = 'Date:',
  ...chipProps
}: DateChipFilterProps) {
  const { t } = useTranslation()

  if (!startDate && !endDate) {
    return null
  }

  const getText = () => {
    let text = label + ':'
    if (startDate && !endDate) {
      text += ` ${t('Filters.FromDate')} ${format(
        new Date(startDate),
        'dd/MM/yyyy',
      )}`
      return text
    }

    if (!startDate && endDate) {
      text += ` ${t('Filters.UntilDate')} ${format(
        new Date(endDate),
        'dd/MM/yyyy',
      )}`
      return text
    }

    if (startDate && endDate) {
      text += ` ${format(new Date(startDate), 'dd/MM/yyyy')} - ${format(
        new Date(endDate),
        'dd/MM/yyyy',
      )}`
      return text
    }
    return text
  }
  return <Chip label={getText()} {...chipProps} />
}

export default DateChipFilter
