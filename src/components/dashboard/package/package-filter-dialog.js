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
import { useFormik } from 'formik'
import { X as XIcon } from '../../../icons/x'
import { InputField } from '../../input-field'
import useHelpers from '../../../hooks/use-helpers'
import { paymentStatusVariants } from '../../../constants/pacakges-statuses'
import { StatusBadge } from '../../status-badge'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const PackageFilterDialog = ({
  open,
  onClose,
  onChangeFilter,
  filter,
  isLoading,
}) => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      commune_id: filter.commune_id,
      wilaya: filter?.wilaya,
      created_from: filter.created_from,
      created_to: filter.created_to,
      type: filter.type,
      echange: filter.echange,
    },
    onSubmit: (values) => {
      onClose()
      onChangeFilter({ ...filter, ...values })
    },
  })

  useEffect(() => {
    if (open) {
      formik.setFieldValue('commune_id', filter.commune_id)
      formik.setFieldValue('wilaya', filter?.wilaya)
      formik.setFieldValue('created_from', filter?.created_from)
      formik.setFieldValue('created_to', filter?.created_to)
      formik.setFieldValue('type', filter?.type)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const { wilayas, communes, packageTypes } = useHelpers(
    formik.values?.wilaya?.id,
    formik.setFieldValue,
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Typography variant="h4" color="text.primary">
          {t('Filters.Filter')}
        </Typography>
        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', gap: 30, justifyContent: 'stretch' }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {t('Filters.Location')}
            </Typography>
            <Box>
              <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <InputField
                    select
                    fullWidth
                    name="wilaya"
                    label={t('Attributes.State')}
                    value={formik.values?.wilaya?.id}
                    onChange={(e) =>
                      formik.setFieldValue(
                        'wilaya',
                        wilayas.find((el) => el.id == e.target.value),
                      )
                    }
                    onBlur={formik.handleBlur}
                  >
                    {wilayas.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </InputField>
                  <Button
                    size="small"
                    disabled={!formik.values.wilaya_id}
                    onClick={() => {
                      formik.setFieldValue('wilaya', '')
                      formik.setFieldValue('commune_id', '')
                    }}
                    variant="text"
                    color="error"
                    sx={{
                      float: 'right',
                      minHeight: 0,
                      minWidth: 0,
                      p: 0,
                      mt: 2,
                    }}
                  >
                    {t('Reset')}
                  </Button>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputField
                    select
                    fullWidth
                    name="commune_id"
                    label={t('Attributes.Town')}
                    value={formik.values.commune_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {communes.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </InputField>
                  <Button
                    size="small"
                    disabled={!formik.values.commune_id}
                    onClick={() => formik.setFieldValue('commune_id', '')}
                    variant="text"
                    color="error"
                    sx={{
                      float: 'right',
                      minHeight: 0,
                      minWidth: 0,
                      p: 0,
                      mt: 2,
                    }}
                  >
                    {t('Reset')}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('Filters.Creation Date')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                <InputField
                  fullWidth
                  error={formik.touched?.from && formik.errors?.from}
                  helperText={formik.touched?.from && formik.errors?.from}
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
                disabled={
                  !formik.values.created_from && !formik.values.created_to
                }
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
          </Box>
          <Divider flexItem variant="middle" orientation="vertical" />
          <Box sx={{ flex: 1 }}>
            <Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('Filters.Order')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <InputField
                      select
                      fullWidth
                      name="type"
                      label={t('Attributes.Package Type')}
                      value={formik.values?.type?.id}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'type',
                          packageTypes.find((el) => el.id == e.target.value),
                        )
                      }
                      onBlur={formik.handleBlur}
                    >
                      {packageTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </InputField>
                    <Button
                      size="small"
                      disabled={!formik.values.type}
                      onClick={() => formik.setFieldValue('type', '')}
                      variant="text"
                      color="error"
                      sx={{
                        float: 'right',
                        minHeight: 0,
                        minWidth: 0,
                        p: 0,
                        mt: 2,
                      }}
                    >
                      {t('Reset')}
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputField
                    fullWidth
                    name="echange"
                    label={t('Attributes.Package Echange')}
                    value={formik.values?.echange}
                    onChange={(e) =>
                      formik.setFieldValue('echange', e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                  <Button
                    size="small"
                    disabled={!formik.values.echange}
                    onClick={() => formik.setFieldValue('echange', '')}
                    variant="text"
                    color="error"
                    sx={{
                      float: 'right',
                      minHeight: 0,
                      minWidth: 0,
                      p: 0,
                      mt: 2,
                    }}
                  >
                    {t('Reset')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={formik.handleSubmit}
          disabled={isLoading}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PackageFilterDialog
