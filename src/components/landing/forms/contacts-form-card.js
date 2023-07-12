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

export default function ContactsFormCard({ formik }) {
  const { t } = useTranslation()

  const canOpen = Boolean(formik?.values?.is_whatsapp_confirmation_shown)

  const changeHandler = () => {
    formik?.setFieldValue('is_whatsapp_confirmation_shown', !canOpen)
  }

  return (
    <Card>
      <CardHeader title={t('landing.ContactInformation')} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <InputField
            error={Boolean(formik?.touched?.phone && formik?.errors?.phone)}
            fullWidth
            helperText={formik?.touched?.phone && formik?.errors?.phone}
            label={t('landing.Phone')}
            name="phone"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.phone}
          />
          <InputField
            error={Boolean(
              formik?.touched?.whatsapp && formik?.errors?.whatsapp,
            )}
            fullWidth
            helperText={formik?.touched?.whatsapp && formik?.errors?.whatsapp}
            label={t('landing.Whatsapp')}
            name="whatsapp"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.whatsapp}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              bgcolor: '#F3F4F7',
              p: 2,
              my: 2,
            }}
          >
            <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
              {t('landing.ClientCanContactYouOnWhatsapp')}
            </Typography>
            <Box>
              <Switch onChange={changeHandler} checked={canOpen} />
              <Typography
                variant="body2"
                sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
                component={'span'}
              >
                {canOpen ? t('landing.Yes') : t('landing.No')}
              </Typography>
            </Box>
          </Box>

          <InputField
            error={Boolean(formik?.touched?.email && formik?.errors?.email)}
            fullWidth
            helperText={formik?.touched?.email && formik?.errors?.email}
            label={t('landing.Email')}
            name="email"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.email}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

ContactsFormCard.propTypes = {
  formik: PropTypes.object,
}
