import { Grid } from '@mui/material'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function ProductDimensionsForm({ formik }) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputField
          error={Boolean(formik.touched.width && formik.errors.width)}
          fullWidth
          helperText={formik.touched.width && formik.errors.width}
          label={t('products.Width')}
          name="width"
          type="number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.width}
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          error={Boolean(formik.touched.height && formik.errors.height)}
          fullWidth
          helperText={formik.touched.height && formik.errors.height}
          label={t('products.Height')}
          name="height"
          type="number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.height}
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          error={Boolean(formik.touched.thickness && formik.errors.thickness)}
          fullWidth
          helperText={formik.touched.thickness && formik.errors.thickness}
          label={t('products.Length')}
          name="thickness"
          type="number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.thickness}
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          error={Boolean(formik.touched.weight && formik.errors.weight)}
          fullWidth
          helperText={formik.touched.weight && formik.errors.weight}
          label={t('products.Weight')}
          name="weight"
          type="number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.weight}
          inputProps={{ min: 0 }}
        />
      </Grid>
    </Grid>
  )
}

ProductDimensionsForm.propTypes = {
  formik: PropTypes.object,
}

export default ProductDimensionsForm
