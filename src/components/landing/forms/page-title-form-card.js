import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import DomainAutocomplete from '../domain-autocomplete'

export default function PageTitleFormCard({ formik }) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader title={t('landing.GiveYourLandingPageATitle')} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <InputField
            error={Boolean(formik?.touched?.name && formik?.errors?.name)}
            fullWidth
            helperText={formik?.touched?.name && formik?.errors?.name}
            label={t('landing.Name')}
            name="name"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.name}
          />

          <DomainAutocomplete
            value={formik?.values?.domains}
            onChange={(domains) => formik?.setFieldValue('domains', domains)}
            error={Boolean(formik?.touched?.domains && formik?.errors?.domains)}
            helperText={formik?.touched?.domains && formik?.errors?.domains}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

PageTitleFormCard.propTypes = {
  formik: PropTypes.object,
}
