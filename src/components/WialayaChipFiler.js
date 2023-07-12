// import type { ChipProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useWilayasQuery } from '@/queries/communes'
import { Box, Chip } from '@mui/material'

// type CompProps = ChipProps & {
//     wilayaid: number
// }

function WilayaChipFilter({ wilayaid, label, ...chipProps }) {
  label = 'State'
  const { t } = useTranslation()
  const { data } = useWilayasQuery()

  const renderLabel = (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <span>
        <span>{t('Attributes.State')} </span>
        <span> {':'} </span>
        <span> {data?.find((wilaya) => wilaya.id === wilayaid)?.name} </span>
      </span>
    </Box>
  )

  return wilayaid ? <Chip label={renderLabel} {...chipProps} /> : null
}

export default WilayaChipFilter
