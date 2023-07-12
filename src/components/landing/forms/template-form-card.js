import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  InputLabel,
  Radio,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { InputField } from '../../input-field'
import { useTemplatesQuery } from '../../../queries/templates'
import Image from 'next/image'
import { CheckBox } from '@mui/icons-material'

const absoluteStyles = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  position: 'absolute',
}
export default function TemplateFormCard({ formik }) {
  const { t } = useTranslation()
  const { data, isLoading } = useTemplatesQuery()

  const isSelected = (templateId) => formik?.values?.template_id === templateId
  const onSelect = (templateId) =>
    formik?.setFieldValue('template_id', templateId)

  return (
    <Card>
      <CardHeader title={t('landing.Templates')} />
      <CardContent>
        <InputLabel
          error={Boolean(
            formik?.touched?.template_id && formik?.errors?.template_id,
          )}
          sx={{
            color: 'text.primary',
            fontSize: 14,
            fontWeight: 500,
            mb: 0.5,
            position: 'relative',
            transform: 'none',
          }}
        >
          {t('landing.ChooseAnAppropriateTemplateForYou')}
        </InputLabel>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {data?.map((el) => (
            <Button
              onClick={() => onSelect(el.id)}
              key={el.id}
              sx={{
                width: 150,
                height: 120,
                bgcolor: '#f1f1f1',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // p: 2,
              }}
            >
              <Typography
                sx={{ position: 'absolute', zIndex: el.image ? 1 : 3 }}
                variant="body2"
              >
                {el.name}
              </Typography>
              {el?.image && (
                <Box
                  sx={{
                    ...absoluteStyles,
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={el?.image || ''}
                    width={200}
                    height={200}
                    objectFit="contain"
                    alt={el?.name}
                  />
                </Box>
              )}

              {isSelected(el.id) && (
                <>
                  <Box
                    sx={{
                      ...absoluteStyles,
                      bgcolor: 'rgba(255,255,255,0.5)',
                      zIndex: 2,
                    }}
                  />
                  <CheckBox
                    fontSize="small"
                    sx={{
                      ...absoluteStyles,
                      top: 16,
                      left: 16,
                      color: 'primary.main',
                      zIndex: 3,
                    }}
                  />
                </>
              )}
            </Button>
          ))}
        </Box>

        <FormHelperText
          error={Boolean(
            formik?.touched?.template_id && formik?.errors?.template_id,
          )}
        >
          {formik?.touched?.template_id && formik?.errors?.template_id}
        </FormHelperText>
      </CardContent>
    </Card>
  )
}

TemplateFormCard.propTypes = {
  formik: PropTypes.object,
}
