import { Box, Button, FormHelperText, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import SocialLinksFormCard from './social-links-form-card'
import AnalyticsFormCard from './analytics-form-card'
import ContactsFormCard from './contacts-form-card'

export default function Step2Form({
  initialValues,
  onGoNext,
  onGoBack,
  disabled = false,
}) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      facebook: initialValues?.facebook || '',
      instagram: initialValues?.instagram || '',
      tiktok: initialValues?.tiktok || '',
      snapchat: initialValues?.snapchat || '',
      youtube: initialValues?.youtube || '',
      google_tag_ids: initialValues?.google_tag_ids || '',
      facebook_pixel_ids: initialValues?.facebook_pixel_ids || '',
      phone: initialValues?.phone || '',
      whatsapp: initialValues?.whatsapp || '',
      is_whatsapp_confirmation_shown: Boolean(
        initialValues?.is_whatsapp_confirmation_shown,
      ),
      email: initialValues?.email || '',
    },
    onSubmit: onGoNext,
  })
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="none">
      <Grid container spacing={4}>
        <Grid xs={12} md={6} item>
          <SocialLinksFormCard formik={formik} />
        </Grid>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <AnalyticsFormCard formik={formik} />
            </Grid>
            <Grid xs={12} item>
              <ContactsFormCard formik={formik} />
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
          {t('landing.Next')}
        </Button>
      </Box>
    </form>
  )
}
