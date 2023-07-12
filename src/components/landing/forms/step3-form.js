import { Box, Button, FormHelperText, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import PageTitleFormCard from './page-title-form-card'
import PriceFormCard from './price-form-card'
import ProductsFormCard from './products-form-card'
import DeliveryFormCard from './delivery-form-card'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ColorsFormCard from './colors-form-card'
import ImagesFormCard from './images-form-card'
import TemplateFormCard from './template-form-card'
import DescriptionFormCard from './description-form-card'
import ThankFormCard from './thank-form-card'

export default function Step3Form({
  onGoNext,
  onGoBack,
  disabled = false,
  initialValues = {},
}) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      main_color: initialValues?.main_color || '',
      image: initialValues?.image || '',
      template_id: initialValues?.template_id || '',
      short_description: initialValues?.short_description || '',
      description: initialValues?.description || '',
      thank_you_message: initialValues?.thank_you_message || '',
    },
    validationSchema: Yup.object().shape({
      main_color: Yup.string().required(t('form.FieldRequired')),
      image: Yup.mixed().required(t('form.FieldRequired')),
      template_id: Yup.number().required(t('form.FieldRequired')),
      short_description: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),
      description: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),
      thank_you_message: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),
    }),
    onSubmit: onGoNext,
  })
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="none">
      <Grid container spacing={4}>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <ColorsFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <ImagesFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <TemplateFormCard formik={formik} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <DescriptionFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <ThankFormCard formik={formik} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {formik.errors.submit && (
        <Box mt={2}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box mt={2} display="flex" justifyContent="space-between" py={2} gap={2}>
        <Button variant="contained" onClick={onGoBack} disabled={disabled}>
          {t('landing.Back')}
        </Button>
        <Button variant="contained" type="submit" disabled={disabled}>
          {t('landing.Create')}
        </Button>
      </Box>
    </form>
  )
}
