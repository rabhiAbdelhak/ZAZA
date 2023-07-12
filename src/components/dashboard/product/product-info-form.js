import { FormHelperText, Grid, InputLabel } from '@mui/material'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { QuillEditor } from '../../quill-editor'

function ProductInfoForm({ formik }) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputField
          error={Boolean(formik.touched.reference && formik.errors.reference)}
          fullWidth
          helperText={formik.touched.reference && formik.errors.reference}
          label={t('products.Reference')}
          name="reference"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.reference}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          error={Boolean(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label={t('products.ProductTitle')}
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          error={Boolean(formik.touched.provider && formik.errors.provider)}
          fullWidth
          helperText={formik.touched.provider && formik.errors.provider}
          label={t('products.Provider')}
          name="provider"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.provider}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          error={Boolean(
            formik.touched.short_description && formik.errors.short_description,
          )}
          fullWidth
          helperText={
            formik.touched.short_description && formik.errors.short_description
          }
          label={t('products.ShortDescription')}
          name="short_description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.short_description}
          multiline
          rows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel
          error={Boolean(
            formik.touched.description && formik.errors.description,
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
          {t('products.LongDescription')}
        </InputLabel>
        <QuillEditor
          sx={{ height: 295 }}
          onChange={(value) => formik.setFieldValue('description', value)}
          value={formik.values.description}
        />
        <FormHelperText
          sx={{ pl: 2 }}
          error={Boolean(
            formik.touched.description && formik.errors.description,
          )}
        >
          {formik.touched.description && formik.errors.description}
        </FormHelperText>
      </Grid>
    </Grid>
  )
}

ProductInfoForm.propTypes = {
  formik: PropTypes.object,
}

export default ProductInfoForm
