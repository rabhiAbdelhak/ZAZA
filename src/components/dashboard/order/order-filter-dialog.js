import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material'

//local imports
import OrderSearchProductFilter from './order-search-product-filter'
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'
import { useFormik } from 'formik'
import useHelpers from '../../../hooks/use-helpers'
import { useTranslation } from 'react-i18next'

export const OrderFilterDialog = (props) => {
  const { open, onClose, onFiltersApply, onFiltersClear, filter } = props
  const {
    min_price,
    max_price,
    client_first_name,
    client_last_name,
    commune_id,
    wilaya_id,
    client_phone,
    created_from,
    created_to,
    status,
    statuses,
    assigned_users,
    source,
    product,
  } = filter
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      min_price,
      max_price,
      created_from,
      created_to,
      client_first_name,
      client_last_name,
      commune_id,
      wilaya_id,
      client_phone,
      source,
      product,
    },

    validate: (values) => {
      const errors = {}
      if (values.min_price > values.max_price) {
        errors.min_price = 'Min Price must be less then Max Price'
      }
      if (values.created_from > values.created_to && values.created_to) {
        errors.created_from = 'Start Date must be less then end Date'
      }
      return errors
    },
    onSubmit: (values) => {
      onFiltersApply({ ...values, status, statuses, assigned_users })
      onClose?.()
    },
  })

  const { wilayas, communes } = useHelpers(
    formik.values?.wilaya_id,
    formik.setFieldValue,
  )

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: 1100,
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
        <Typography color="textPrimary" variant="inherit">
          {t('Filters.Filter')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', gap: 20 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('Filters.Price Range')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <InputField
                  error={Boolean(
                    formik.touched?.min_price && formik.errors?.min_price,
                  )}
                  helperText={
                    formik.touched?.min_price && formik.errors?.min_price
                  }
                  fullWidth
                  type="number"
                  label={t('Attributes.From')}
                  name="min_price"
                  value={formik.values.min_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  fullWidth
                  type="number"
                  label={t('Attributes.To')}
                  name="max_price"
                  value={
                    formik.values.max_price !== Infinity
                      ? formik.values.max_price
                      : ''
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Button
                size="small"
                disabled={Boolean(
                  formik.values.min_price === 0 &&
                    formik.values.max_price === Infinity,
                )}
                onClick={() => {
                  formik.setFieldValue('max_price', Infinity)
                  formik.setFieldValue('min_price', 0)
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 0 }}
              >
                {t('Reset')}
              </Button>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('Filters.Date Range')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <InputField
                  fullWidth
                  error={Boolean(
                    formik.touched?.created_from && formik.errors?.created_from,
                  )}
                  helperText={
                    formik.touched?.created_from && formik.errors?.created_from
                  }
                  type="date"
                  label={t('Attributes.From')}
                  name="created_from"
                  value={formik.values.created_from}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  fullWidth
                  type="date"
                  label={t('Attributes.To')}
                  name="created_to"
                  value={formik.values.created_to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Button
                size="small"
                disabled={Boolean(
                  !formik.values.created_from && !formik.values.created_to,
                )}
                onClick={() => {
                  formik.setFieldValue('created_from', '')
                  formik.setFieldValue('created_to', '')
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 0 }}
              >
                {t('Reset')}
              </Button>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('Attributes.State')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <InputField
                    error={Boolean(
                      formik.touched?.min_price && formik.errors?.min_price,
                    )}
                    helperText={
                      formik.touched?.min_price && formik.errors?.min_price
                    }
                    fullWidth
                    select
                    label={t('Attributes.State')}
                    name="wilaya_id"
                    value={formik.values.wilaya_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {wilayas.map((wilaya) => {
                      return (
                        <MenuItem key={wilaya.id} value={wilaya.id}>
                          {wilaya.name}
                        </MenuItem>
                      )
                    })}
                  </InputField>
                  <Button
                    size="small"
                    disabled={Boolean(formik.values.wilaya_id === '')}
                    onClick={() => {
                      formik.setFieldValue('wilaya_id', '')
                      formik.setFieldValue('commune_id', '')
                    }}
                    variant="text"
                    color="error"
                    sx={{
                      mt: 2,
                      float: 'right',
                      minHeight: 0,
                      minWidth: 0,
                      p: 0,
                    }}
                  >
                    {t('Reset')}
                  </Button>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputField
                    fullWidth
                    select
                    label={t('Attributes.Town')}
                    name="commune_id"
                    value={formik.values.commune_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {communes.map((commune) => {
                      return (
                        <MenuItem key={commune.id} value={commune.id}>
                          {commune.name}
                        </MenuItem>
                      )
                    })}
                  </InputField>
                  <Button
                    size="small"
                    disabled={Boolean(formik.values.commune_id === '')}
                    onClick={() => {
                      formik.setFieldValue('commune_id', '')
                    }}
                    variant="text"
                    color="error"
                    sx={{
                      mt: 2,
                      float: 'right',
                      minHeight: 0,
                      minWidth: 0,
                      p: 0,
                    }}
                  >
                    {t('Reset')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('Filters.Client Information')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <InputField
                  fullWidth
                  type="text"
                  label={t('Attributes.First Name')}
                  name="client_first_name"
                  value={formik.values.client_first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  fullWidth
                  type="text"
                  label={t('Attributes.Last Name')}
                  name="client_last_name"
                  value={formik.values.client_last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Button
                size="small"
                disabled={Boolean(
                  !formik.values.client_last_name &&
                    !formik.values.client_first_name,
                )}
                onClick={() => {
                  formik.setFieldValue('client_first_name', '')
                  formik.setFieldValue('client_last_name', '')
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 0 }}
              >
                {t('Reset')}
              </Button>
            </Box>
            <Box>
              <InputField
                fullWidth
                type="text"
                label={t('Attributes.Phone Number')}
                name="client_phone"
                value={formik.values.client_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                size="small"
                disabled={Boolean(!formik.values.client_phone)}
                onClick={() => {
                  formik.setFieldValue('client_phone', '')
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 2 }}
              >
                {t('Reset')}
              </Button>
            </Box>
            <Box>
              <InputField
                fullWidth
                type="text"
                label={t('Attributes.Lead Source')}
                name="source"
                value={formik.values.source}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                size="small"
                disabled={Boolean(!formik.values.source)}
                onClick={() => {
                  formik.setFieldValue('source', '')
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 2 }}
              >
                {t('Reset')}
              </Button>
            </Box>
            <Box>
              <OrderSearchProductFilter
                filter={filter}
                onApplyFilter={onFiltersApply}
              />
              <Button
                size="small"
                disabled={Boolean(!filter.product)}
                onClick={() => {
                  onFiltersApply({ ...filter, product: '' })
                }}
                variant="text"
                color="error"
                sx={{ float: 'right', minHeight: 0, minWidth: 0, p: 0, mt: 2 }}
              >
                {t('Reset')}
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="text"
          onClick={() => {
            onFiltersClear()
            formik.resetForm()
          }}
        >
          {t('Reset')}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            formik.handleSubmit()
          }}
          variant="contained"
          sx={{ color: 'primary.contrast' }}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

OrderFilterDialog.defaultProps = {
  open: false,
}

OrderFilterDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
