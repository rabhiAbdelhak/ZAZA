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

export default function SocialLinksFormCard({ formik }) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('landing.SocialMediaLinks')} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <InputField
            error={Boolean(
              formik?.touched?.facebook && formik?.errors?.facebook,
            )}
            fullWidth
            helperText={formik?.touched?.facebook && formik?.errors?.facebook}
            label={t('landing.Facebook')}
            name="facebook"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.facebook}
          />
          <InputField
            error={Boolean(
              formik?.touched?.instagram && formik?.errors?.instagram,
            )}
            fullWidth
            helperText={formik?.touched?.instagram && formik?.errors?.instagram}
            label={t('landing.Instagram')}
            name="instagram"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.instagram}
          />
          <InputField
            error={Boolean(formik?.touched?.tiktok && formik?.errors?.tiktok)}
            fullWidth
            helperText={formik?.touched?.tiktok && formik?.errors?.tiktok}
            label={t('landing.Tiktok')}
            name="tiktok"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.tiktok}
          />
          <InputField
            error={Boolean(
              formik?.touched?.snapchat && formik?.errors?.snapchat,
            )}
            fullWidth
            helperText={formik?.touched?.snapchat && formik?.errors?.snapchat}
            label={t('landing.Snapchat')}
            name="snapchat"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.snapchat}
          />
          <InputField
            error={Boolean(formik?.touched?.youtube && formik?.errors?.youtube)}
            fullWidth
            helperText={formik?.touched?.youtube && formik?.errors?.youtube}
            label={t('landing.Youtube')}
            name="youtube"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.youtube}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

SocialLinksFormCard.propTypes = {
  formik: PropTypes.object,
}
