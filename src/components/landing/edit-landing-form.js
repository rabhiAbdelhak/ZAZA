import { Box, Button, FormHelperText, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import AnalyticsFormCard from './forms/analytics-form-card'
import ColorsFormCard from './forms/colors-form-card'
import ContactsFormCard from './forms/contacts-form-card'
import DeliveryFormCard from './forms/delivery-form-card'
import DescriptionFormCard from './forms/description-form-card'
import ImagesFormCard from './forms/images-form-card'
import PageTitleFormCard from './forms/page-title-form-card'
import PriceFormCard from './forms/price-form-card'
import ProductsFormCard from './forms/products-form-card'
import SocialLinksFormCard from './forms/social-links-form-card'
import TemplateFormCard from './forms/template-form-card'
import ThankFormCard from './forms/thank-form-card'
import * as Yup from 'yup'

export default function EditLandingForm({ initialValues, onSubmit }) {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      price: initialValues?.price || '',
      promo_price: initialValues?.promo_price || '',
      has_discount: Boolean(
        initialValues?.start_date && initialValues?.end_date,
      ),
      start_date: initialValues?.start_date || null,
      end_date: initialValues?.end_date || null,
      products:
        initialValues?.products?.map((el) => ({
          ...el,
          selectedQty: el?.landing_product?.quantity,
        })) || [],
      delivery_type_id: initialValues?.delivery_type_id || '',
      free_delivery: Boolean(initialValues?.free_delivery),
      can_be_opened: Boolean(initialValues?.can_be_opened),
      note: initialValues?.note || '',
      facebook: initialValues?.social_media?.facebook || '',
      instagram: initialValues?.social_media?.instagram || '',
      tiktok: initialValues?.social_media?.tiktok || '',
      snapchat: initialValues?.social_media?.snapchat || '',
      youtube: initialValues?.social_media?.youtube || '',
      google_tag_ids: initialValues?.google_tag_ids || '',
      facebook_pixel_ids: initialValues?.facebook_pixel_ids || '',
      phone: initialValues?.phone || '',
      whatsapp: initialValues?.whatsapp || '',
      is_whatsapp_confirmation_shown: Boolean(
        initialValues?.is_whatsapp_confirmation_shown,
      ),
      email: initialValues?.email || '',
      main_color: initialValues?.main_color || '',
      image: initialValues?.image || '',
      template_id: initialValues?.template?.id || '',
      short_description: initialValues?.short_description || '',
      description: initialValues?.description || '',
      thank_you_message: initialValues?.thank_you_message || '',
      domains: initialValues?.domains || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }), { min: 3 })
        .required(t('form.FieldRequired')),
      price: Yup.number().required(t('form.FieldRequired')),
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
        .min(0, t('form.FieldRequired'))
        .required(t('form.FieldRequired')),
      can_be_opened: Yup.boolean(),
      note: Yup.string().min(3, t('form.MinLength', { min: 3 }), { min: 3 }),
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
    onSubmit,
  })

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      gap={5}
      p={4}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h2">
          {t('landing.ProductInformation')}
        </Typography>
        <PageTitleFormCard formik={formik} />
        <PriceFormCard formik={formik} />
        <ProductsFormCard formik={formik} />
        <DeliveryFormCard formik={formik} responsiveByWidth />
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h2">
          {t('landing.ProductLinks')}
        </Typography>
        <SocialLinksFormCard formik={formik} />
        <AnalyticsFormCard formik={formik} />
        <ContactsFormCard formik={formik} />
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h2">
          {t('landing.PageCustomization')}
        </Typography>
        <ColorsFormCard formik={formik} responsiveByWidth />
        <ImagesFormCard formik={formik} />
        <TemplateFormCard formik={formik} />
        <DescriptionFormCard formik={formik} />
        <ThankFormCard formik={formik} />
      </Box>

      <Box>
        <FormHelperText error>{formik.errors.submit}</FormHelperText>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained">
          {t('form.Save')}
        </Button>
      </Box>
    </Box>
  )
}
