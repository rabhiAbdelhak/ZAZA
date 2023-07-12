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
import { DateField } from '../../date-field'

export default function PriceFormCard({ formik }) {
  const { t } = useTranslation()

  const onDiscountChange = () => {
    const newValue = !formik?.values?.has_discount
    formik?.setFieldValue('has_discount', newValue)
    if (newValue) {
      formik?.setFieldValue('start_date', null)
      formik?.setFieldValue('end_date', null)
      formik?.setFieldValue('promo_price', '')
    }
  }

  return (
    <Card>
      <CardHeader title={t('landing.PriceYourItems')} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <InputField
            error={Boolean(formik?.touched?.price && formik?.errors?.price)}
            fullWidth
            helperText={formik?.touched?.price && formik?.errors?.price}
            label={t('landing.Price')}
            name="price"
            type="number"
            placeholder="DZD"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.price}
            inputProps={{ min: 0 }}
          />
          <Box
            gap={2}
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>
                {t('landing.DiscountItems')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {t('landing.EnableDiscountsToSeeTheCorrespondingSettings')}
              </Typography>
            </Box>
            <Switch
              checked={Boolean(formik?.values?.has_discount)}
              onChange={onDiscountChange}
            />
          </Box>
          {Boolean(formik?.values?.has_discount) && (
            <Box>
              <Typography sx={{ fontWeight: 500 }}>
                {t('landing.PromotionPeriod')}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <DateField
                    minDate={new Date()}
                    error={Boolean(
                      formik?.touched?.start_date && formik?.errors?.start_date,
                    )}
                    helperText={
                      formik?.touched?.start_date && formik?.errors?.start_date
                    }
                    fullWidth
                    label={t('landing.From')}
                    value={
                      formik?.values?.start_date
                        ? new Date(formik?.values?.start_date)
                        : null
                    }
                    onChange={(value) =>
                      formik?.setFieldValue('start_date', value)
                    }
                  />
                  <DateField
                    minDate={formik?.values?.start_date || null}
                    fullWidth
                    value={
                      formik?.values?.end_date
                        ? new Date(formik?.values?.end_date)
                        : null
                    }
                    label={t('landing.To')}
                    error={Boolean(
                      formik?.touched?.end_date && formik?.errors?.end_date,
                    )}
                    helperText={
                      formik?.touched?.end_date && formik?.errors?.end_date
                    }
                    onChange={(value) =>
                      formik?.setFieldValue('end_date', value)
                    }
                  />
                </Box>
                <InputField
                  sx={{ mt: 2 }}
                  error={Boolean(
                    formik?.touched?.promo_price && formik?.errors?.promo_price,
                  )}
                  fullWidth
                  helperText={
                    formik?.touched?.promo_price && formik?.errors?.promo_price
                  }
                  label={t('landing.PromoPrice')}
                  name="promo_price"
                  type="number"
                  placeholder="DZD"
                  onBlur={formik?.handleBlur}
                  onChange={formik?.handleChange}
                  value={formik?.values?.promo_price}
                  inputProps={{ min: 0 }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

PriceFormCard.propTypes = {
  formik: PropTypes.object,
}
