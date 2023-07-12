import { Grid } from '@mui/material'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function ProductPricingForm({ formik }) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputField
          error={Boolean(
            formik.touched.buying_price && formik.errors.buying_price,
          )}
          fullWidth
          helperText={formik.touched.buying_price && formik.errors.buying_price}
          label={t('products.BuyingPrice')}
          name="buying_price"
          type="number"
          inputProps={{ min: 0 }}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.buying_price}
          placeholder="DZD"
        />
      </Grid>
      <Grid item xs={4}>
        <InputField
          error={Boolean(formik.touched.price1 && formik.errors.price1)}
          fullWidth
          helperText={formik.touched.price1 && formik.errors.price1}
          label={t('products.SellingPrice#', { num: 1 })}
          name="price1"
          type="number"
          inputProps={{ min: 0 }}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.price1}
          placeholder="DZD"
        />
      </Grid>
      <Grid item xs={4}>
        <InputField
          error={Boolean(formik.touched.price2 && formik.errors.price2)}
          fullWidth
          helperText={formik.touched.price2 && formik.errors.price2}
          label={t('products.SellingPrice#', { num: 2 })}
          name="price2"
          type="number"
          inputProps={{ min: 0 }}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.price2}
          placeholder="DZD"
        />
      </Grid>
      <Grid item xs={4}>
        <InputField
          error={Boolean(formik.touched.price3 && formik.errors.price3)}
          fullWidth
          helperText={formik.touched.price3 && formik.errors.price3}
          label={t('products.SellingPrice#', { num: 3 })}
          name="price3"
          type="number"
          inputProps={{ min: 0 }}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.price3}
          placeholder="DZD"
        />
      </Grid>
    </Grid>
  )
}

ProductPricingForm.propTypes = {
  formik: PropTypes.object,
}

export default ProductPricingForm
