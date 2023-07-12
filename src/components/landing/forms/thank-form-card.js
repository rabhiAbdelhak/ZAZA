import { Card, CardContent, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { InputField } from '../../input-field'

export default function ThankFormCard({ formik }) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('landing.ThankYourClient')} />
      <CardContent>
        <InputField
          error={Boolean(
            formik?.touched?.thank_you_message &&
              formik?.errors?.thank_you_message,
          )}
          fullWidth
          helperText={
            formik?.touched?.thank_you_message &&
            formik?.errors?.thank_you_message
          }
          label={t('landing.Message')}
          name="thank_you_message"
          rows={3}
          multiline
          onBlur={formik?.handleBlur}
          onChange={formik?.handleChange}
          value={formik?.values?.thank_you_message}
        />
      </CardContent>
    </Card>
  )
}

ThankFormCard.propTypes = {
  formik: PropTypes.object,
}
