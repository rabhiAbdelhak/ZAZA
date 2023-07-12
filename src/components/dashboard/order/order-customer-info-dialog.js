import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputField } from '../../input-field'

//local imports
import { X as XIcon } from '../../../icons/x'
import useHelpers from '../../../hooks/use-helpers'
import CommuneAutocomplete from '../../CommuneAutocomplete'
import { useTranslation } from 'react-i18next'

const boxStyle = { display: 'flex', flexDirection: 'column', gap: 2, my: 2 }

const CustomerInfoFormDilaog = ({ open, onClose, order, onSubmit }) => {
  const initCommune = {
    id: order?.commune_id,
    name: order?.commune,
    wilaya: { id: order?.wilaya_id, name: order?.wilaya },
  }
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      client_first_name: order?.client_first_name,
      client_last_name: order?.client_last_name,
      client_phone: order.client_phone,
      client_phone2: order?.client_phone2 || '',
      client_address: order?.client_address,
      commune: initCommune,
    },
    validationSchema: Yup.object({
      client_first_name: Yup.string().required('Please Enter a First Name!'),
      client_last_name: Yup.string().required('Please Enter a Last Name!'),
      commune: Yup.mixed().nullable().required('Please Select a Commune'),
      client_address: Yup.string().required('Please Enter a Complete Adress!'),
      client_phone: Yup.string().required('Please Enter a Phone Number'),
    }),
    onSubmit: async (values, helpers) => {
      const commune_id = values.commune?.id
      const wilaya_id = values.commune?.wilaya?.id
      const commune = values.commune?.name
      const wilaya = values.commune?.wilaya?.name
      onSubmit({ ...values, commune_id, wilaya_id, commune, wilaya }, helpers)
      onClose?.()
    },
  })

  const { deliveryTypes } = useHelpers(
    formik.values?.commune?.wilaya?.id,
    formik.setFieldValue,
  )
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      PaperProps={{
        sx: {
          maxWidth: 700,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Typography color="text.primary" variant="inherit">
          {t('Edit')} {t('orders.Customer information')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} sx={{ padding: '20px 0' }}>
          <Box sx={boxStyle}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched.client_first_name &&
                    formik.errors.client_first_name,
                )}
                helperText={
                  formik.touched.client_first_name &&
                  formik.errors.client_first_name
                }
                type="text"
                name="client_first_name"
                label={t('Attributes.First Name')}
                value={formik.values.client_first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched.client_last_name &&
                    formik.errors.client_last_name,
                )}
                helperText={
                  formik.touched.client_last_name &&
                  formik.errors.client_last_name
                }
                type="text"
                name="client_last_name"
                label={t('Attributes.Last Name')}
                value={formik.values.client_last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched.client_phone && formik.errors.client_phone,
                )}
                helperText={
                  formik.touched.client_phone && formik.errors.client_phone
                }
                type="text"
                name="client_phone"
                label={t('Attributes.Phone Number #1')}
                value={formik.values.client_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched.client_phone2 && formik.errors.client_phone2,
                )}
                helperText={
                  formik.touched.client_phone2 && formik.errors.client_phone2
                }
                type="text"
                name="client_phone2"
                label={t('Attributes.Phone Number #2')}
                value={formik.values.client_phone2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>

            <CommuneAutocomplete
              autoComplete="off"
              error={Boolean(formik.touched.commune && formik.errors.commune)}
              helperText={formik.touched.commune && formik.errors.commune}
              autoSelect
              label={t('Attributes.Town')}
              name="commune"
              placeholder="search by commune name"
              onChange={(e, value) => formik.setFieldValue('commune', value)}
              onBlur={formik.handleBlur}
              value={formik.values.commune}
            />

            <Typography variant="caption" color="warning.main">
              {t('Note')}:{' '}
              {t(
                'orders.If you change the wilaya, delivery prices will be changed.',
              )}
            </Typography>
            <InputField
              error={Boolean(
                formik.touched.client_address && formik.errors.client_address,
              )}
              helperText={
                formik.touched.client_address && formik.errors.client_address
              }
              type="text"
              name="client_address"
              label={t('Attributes.Address')}
              InputProps={{ sx: { minHeight: 70 } }}
              value={formik.values.client_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={onClose}
        >
          {t('Cancel')}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          sx={{ color: 'primary.contrast' }}
        >
          {t('Edit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerInfoFormDilaog
