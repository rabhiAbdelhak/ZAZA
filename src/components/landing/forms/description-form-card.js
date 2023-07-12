import {
  Card,
  CardContent,
  CardHeader,
  Box,
  FormHelperText,
  InputLabel,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { InputField } from '../../input-field'
import { QuillEditor } from '../../quill-editor'

export default function DescriptionFormCard({ formik }) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('landing.Description')} />
      <CardContent>
        <Box display="flex" gap={4} flexWrap="wrap">
          <InputField
            error={Boolean(
              formik?.touched?.short_description &&
                formik?.errors?.short_description,
            )}
            fullWidth
            helperText={
              formik?.touched?.short_description &&
              formik?.errors?.short_description
            }
            label={t('landing.ShortDescription')}
            name="short_description"
            multiline
            rows={4}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.short_description}
          />
          <Box sx={{ width: '100%' }}>
            <InputLabel
              error={Boolean(
                formik?.touched?.description && formik?.errors?.description,
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
              {t('landing.LongDescription')}
            </InputLabel>
            <QuillEditor
              sx={{ height: 250 }}
              onChange={(value) => formik?.setFieldValue('description', value)}
              value={formik?.values?.description}
            />
            <FormHelperText
              sx={{ pl: 2 }}
              error={Boolean(
                formik?.touched?.description && formik?.errors?.description,
              )}
            >
              {formik?.touched?.description && formik?.errors?.description}
            </FormHelperText>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

DescriptionFormCard.propTypes = {
  formik: PropTypes.object,
}
