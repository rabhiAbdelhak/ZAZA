import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  Stack,
} from '@mui/material'
import { useFormik } from 'formik'
import ProductDimensionsForm from './product-dimensions-form'
import ProductInfoForm from './product-info-form'
import ProductPricingForm from './product-pricing-form'
import ProductProductImagesForm from './product-product-Images-form'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export const productFormDefaultValue = {
  reference: '',
  name: '',
  provider: '',
  short_description: '',
  description: '',
  buying_price: '',
  price1: '',
  price2: '',
  price3: '',
  width: '',
  height: '',
  thickness: '',
  weight: '',
  images: [],
}

function ProductForm({
  onSubmit,
  initialValues = productFormDefaultValue,
  submitTitle = 'Save',
  autoResize,
}) {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      reference: Yup.string().required(t('form.FieldRequired')),
      name: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      provider: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      short_description: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      description: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      buying_price: Yup.number().required(t('form.FieldRequired')),
      price1: Yup.number().required(t('form.FieldRequired')),
      price2: Yup.number().required(t('form.FieldRequired')),
      price3: Yup.number().required(t('form.FieldRequired')),
      width: Yup.number().required(t('form.FieldRequired')),
      height: Yup.number().required(t('form.FieldRequired')),
      thickness: Yup.number().required(t('form.FieldRequired')),
      weight: Yup.number().required(t('form.FieldRequired')),
      images: Yup.array().min(1, t('form.FieldRequired')),
    }),
    onSubmit,
  })

  const renderTitle = (order = 1, text = '') => (
    <>
      <span>{order}</span>
      <Box mr={1} component="span">
        .
      </Box>
      <span>{text}</span>
    </>
  )

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="none">
      <Grid
        container
        spacing={4}
        sx={{
          ...(autoResize && {
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${autoResize}px, 100%), 1fr))`,
            display: 'grid',
          }),
        }}
      >
        <Grid item xs={12} md={autoResize ? 12 : 6}>
          <Card>
            <CardHeader title={renderTitle(1, t('products.ProductInfo'))} />
            <CardContent>
              <ProductInfoForm formik={formik} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={autoResize ? 12 : 6}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title={renderTitle(2, t('products.Pricing'))} />
                <CardContent>
                  <ProductPricingForm formik={formik} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title={renderTitle(3, t('products.Dimensions'))} />
                <CardContent>
                  <ProductDimensionsForm formik={formik} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={renderTitle(4, t('products.ProductImages'))}
                />
                <CardContent>
                  <ProductProductImagesForm formik={formik} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {formik.errors.submit && (
        <Box mt={4}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          sx={{ width: { xs: '100%', md: 'fit-content' } }}
        >
          {submitTitle}
        </Button>
      </Box>
    </form>
  )
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func,
  submitTitle: PropTypes.string,
  initialValues: PropTypes.shape({
    reference: PropTypes.string,
    name: PropTypes.string,
    provider: PropTypes.string,
    short_description: PropTypes.string,
    description: PropTypes.string,
    buying_price: PropTypes.number,
    price1: PropTypes.number,
    price2: PropTypes.number,
    price3: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    thickness: PropTypes.number,
    weight: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default ProductForm
