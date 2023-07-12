import { Box, Button, FormHelperText, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import PageTitleFormCard from './page-title-form-card'
import PriceFormCard from './price-form-card'
import ProductsFormCard from './products-form-card'
import DeliveryFormCard from './delivery-form-card'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Step1Form({
  initialValues,
  onGoNext,
  disabled = false,
}) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      price: initialValues?.price || '',
      promo_price: initialValues?.price || '',
      has_discount: Boolean(
        initialValues?.start_date && initialValues?.end_date,
      ),
      start_date: initialValues?.start_date || null,
      end_date: initialValues?.end_date || null,
      products: initialValues?.products || [],
      delivery_type_id: initialValues?.delivery_type_id || '',
      free_delivery: Boolean(initialValues?.free_delivery),
      can_be_opened: Boolean(initialValues?.can_be_opened),
      note: initialValues?.name || '',
      domains: initialValues?.domains || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      price: Yup.number().required(t('form.FieldRequired')),
      promo_price: Yup.number().when('has_discount', {
        is: true,
        then: Yup.number().required(t('form.FieldRequired')),
      }),
      has_discount: Yup.boolean(),
      start_date: Yup.date()
        .nullable(true)
        .when('has_discount', {
          is: true,
          then: Yup.date().nullable(true).required(t('form.FieldRequired')),
        }),
      end_date: Yup.mixed().when('has_discount', {
        is: true,
        then: Yup.date()
          .nullable(true)
          .min(Yup.ref('start_date'), t('form.EndDateBeforeStartDate'))
          .required(t('form.FieldRequired')),
      }),
      products: Yup.array()
        .min(1, t('form.FieldRequired'))
        .required(t('form.FieldRequired')),
      domains: Yup.array()
        .min(1, t('form.FieldRequired'))
        .required(t('form.FieldRequired')),
      delivery_type_id: Yup.number()
        .min(1, t('form.FieldRequired'))
        .required(t('form.FieldRequired')),
      can_be_opened: Yup.boolean(),
      note: Yup.string().min(3, t('form.MinLength', { min: 3 }), { min: 3 }),
    }),
    onSubmit: onGoNext,
  })
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="none">
      <Grid container spacing={4}>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <PageTitleFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <PriceFormCard formik={formik} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <ProductsFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <DeliveryFormCard formik={formik} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {formik.errors.submit && (
        <Box mt={2}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box mt={2} display="flex" justifyContent="flex-end" py={2} gap={2}>
        <Button variant="contained" type="submit" disabled={disabled}>
          {t('landing.Next')}
        </Button>
      </Box>
    </form>
  )
}
