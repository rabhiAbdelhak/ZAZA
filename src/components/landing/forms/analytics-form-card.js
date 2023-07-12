import {
  Card,
  CardContent,
  CardHeader,
  Switch,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'

export default function AnalyticsFormCard({ formik }) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('landing.Analytics')} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <InputField
            error={Boolean(
              formik?.touched?.google_tag_ids && formik?.errors?.google_tag_ids,
            )}
            fullWidth
            helperText={
              formik?.touched?.google_tag_ids && formik?.errors?.google_tag_ids
            }
            label={t('landing.GoogleTagId')}
            name="google_tag_ids"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.google_tag_ids}
          />
          <InputField
            error={Boolean(
              formik?.touched?.facebook_pixel_ids &&
                formik?.errors?.facebook_pixel_ids,
            )}
            fullWidth
            helperText={
              formik?.touched?.facebook_pixel_ids &&
              formik?.errors?.facebook_pixel_ids
            }
            label={t('landing.FacebookPixelId')}
            name="facebook_pixel_ids"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.facebook_pixel_ids}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

AnalyticsFormCard.propTypes = {
  formik: PropTypes.object,
}
