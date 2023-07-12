import { Box, Typography, BoxProps, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InputField } from './input-field'

export type PageStepHeaderProps = {
  step: string
  title: string
  content?: string
  entities: ImportEntity[]
  entity: ImportEntity
  onSelectEntity: (id: ImportEntity['id']) => void
} & BoxProps

function PageStepHeader({
  content,
  title,
  step,
  entities,
  entity,
  onSelectEntity,
  ...boxProps
}: PageStepHeaderProps) {
  const { t } = useTranslation()
  return (
    <Box textAlign={'center'} {...boxProps}>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {t('Importation.' + title)}
      </Typography>
      {Boolean(content) && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('Importation.' + content)}
        </Typography>
      )}
      {step === 'step 2 of 2' && (
        <Box sx={{ width: '300px', m: '0 auto', mt: 2 }}>
          <InputField
            select
            fullWidth
            name="entity"
            value={entity.id}
            onChange={(e: any) => onSelectEntity(e.target.value)}
          >
            {entities.map((entity: ImportEntity) => {
              return (
                <MenuItem key={entity.id} value={entity.id}>
                  {entity.label}
                </MenuItem>
              )
            })}
          </InputField>
        </Box>
      )}
    </Box>
  )
}
export default PageStepHeader
