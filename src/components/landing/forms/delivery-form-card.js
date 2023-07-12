import {
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InputField } from '../../input-field'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { DateField } from '../../date-field'
import {
  useDeliveryTypesQuery,
  useDeliveryWilayaIdQuery,
} from '../../../queries/delivery'
import DeliveryCard from '../../delivery-card'
import { useEffect } from 'react'

export default function DeliveryFormCard({
  formik,
  responsiveByWidth = false,
}) {
  const { t } = useTranslation()

  const { data, isLoading } = useDeliveryTypesQuery()

  const onSelect = (el) => {
    formik?.setFieldValue('delivery_type_id', el.id)
  }

  const canOpen = Boolean(formik?.values?.can_be_opened)
  const isDeliveryFree = Boolean(formik?.values?.free_delivery)

  const onChangeFreeDelivery = () => {
    formik?.setFieldValue('free_delivery', !isDeliveryFree)
  }

  const changeHandler = () => {
    formik?.setFieldValue('can_be_opened', !canOpen)
  }

  return (
    <Card>
      <CardHeader title={t('landing.DeliveryInformation')} />
      <CardContent>
        <Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              bgcolor: '#F3F4F7',
              p: 2,
              mb: 4,
            }}
          >
            <Typography noWrap sx={{ flexGrow: 1 }}>
              {t('landing.FreeDelivery')}
            </Typography>
            <Box>
              <Switch
                onChange={onChangeFreeDelivery}
                checked={isDeliveryFree}
              />
              <Typography
                variant="body2"
                sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
                component={'span'}
              >
                {isDeliveryFree ? t('landing.Yes') : t('landing.No')}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: responsiveByWidth
                ? 'repeat(2, 1fr)'
                : { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            }}
          >
            {data?.map((el) => (
              <DeliveryCard
                onClick={() => onSelect(el)}
                selected={formik?.values?.delivery_type_id === el.id}
                key={el.id}
                type={el.name}
              />
            ))}

            {isLoading && (
              <>
                <Skeleton variant="rectangular" width={250} height={100} />
                <Skeleton variant="rectangular" width={250} height={100} />
                <Skeleton variant="rectangular" width={250} height={100} />
              </>
            )}
          </Box>
          <FormHelperText
            sx={{ mt: 2 }}
            error={Boolean(
              formik?.touched?.delivery_type_id &&
                formik?.errors?.delivery_type_id,
            )}
          >
            {formik?.touched?.delivery_type_id &&
              formik?.errors?.delivery_type_id}
          </FormHelperText>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              bgcolor: '#F3F4F7',
              p: 2,
              my: 4,
            }}
          >
            <Typography noWrap sx={{ flexGrow: 1 }}>
              {t('landing.PackageCanBeOpened')}
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
            error={Boolean(formik?.touched?.note && formik?.errors?.note)}
            fullWidth
            helperText={formik?.touched?.note && formik?.errors?.note}
            label={t('landing.Note')}
            name="note"
            multiline
            rows={4}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.note}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

DeliveryFormCard.propTypes = {
  formik: PropTypes.object,
  responsiveByWidth: PropTypes.bool,
}
