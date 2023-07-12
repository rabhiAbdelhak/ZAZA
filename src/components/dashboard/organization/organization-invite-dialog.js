import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { InputField } from '../../input-field'
import { ROLES } from '../../../constants/roles'
import { useAuth } from '../../../providers/AuthProvider'
import CommuneAutocomplete from '../../CommuneAutocomplete'
import { useTranslation } from 'react-i18next'

export const OrganizationInviteDialog = (props) => {
  const { open, onClose, employee, onSubmit, ...other } = props

  const isEdit = Boolean(employee?.id)
  const roleOptions = ['employe_manager', 'employe']

  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: employee?.roles || '',
      phone: '',
      commune: '',
      ...(!isEdit && { password: '' }),
      ...employee,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('form.MustBeAvalidEmail'))
        .max(255)
        .required(t('form.EmailRequired')),
      phone: Yup.string()
        .max(14, t('form.MustBeAvalidPhone'))
        .required(t('form.PhoneRequired')),
      name: Yup.string().max(255).required(t('form.NameRequired')),
      role: Yup.mixed()
        .oneOf(Object.keys(ROLES))
        .required(t('form.RoleRequired')),
      commune: Yup.mixed().required(t('form.CommuneRequired')),
      ...(!isEdit && {
        password: Yup.string()
          .min(6, t('form.PasswordMinRequired', { min: 6 }))
          .required(t('form.PasswordRequired')),
      }),
    }),
    onSubmit,
  })

  return (
    <Dialog
      onClose={formik.isSubmitting ? undefined : onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm(),
      }}
      {...other}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="none">
        <DialogTitle>
          {isEdit
            ? t('organisationPage.EditTeamMember')
            : t('organisationPage.InviteTeamMember')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={t('form.FullName')}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label={t('form.EmailAddress')}
                name="email"
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label={t('form.PhoneNumber')}
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="tel"
                value={formik.values.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <CommuneAutocomplete
                error={Boolean(formik.touched.commune && formik.errors.commune)}
                helperText={formik.touched.commune && formik.errors.commune}
                label="Commune"
                name="commune"
                onChange={(e, value) => formik.setFieldValue('commune', value)}
                onBlur={formik.handleBlur}
                value={formik.values.commune}
              />
            </Grid>
            {!isEdit && (
              <Grid item xs={12}>
                <InputField
                  error={Boolean(
                    formik.touched.password && formik.errors.password,
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label={t('form.Password')}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography
                color="textPrimary"
                sx={{ mb: 1.5 }}
                variant="subtitle2"
              >
                {t('form.Role')}
              </Typography>
              <Card>
                <RadioGroup
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  {roleOptions.map((option, index) => (
                    <Fragment key={option}>
                      <FormControlLabel
                        disableTypography
                        control={<Radio color="primary" />}
                        label={
                          <div>
                            <Typography color="textPrimary" variant="body1">
                              {t(`roles.${option}`)}
                            </Typography>
                          </div>
                        }
                        sx={{ p: 1.5 }}
                        value={option}
                      />
                      {roleOptions.length > index + 1 && <Divider />}
                    </Fragment>
                  ))}
                </RadioGroup>
              </Card>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              )}
            </Grid>
            {formik.errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            onClick={onClose}
            type="button"
            variant="text"
          >
            {t('form.Cancel')}
          </Button>
          <Button
            startIcon={
              formik.isSubmitting && (
                <CircularProgress thickness={6} color="inherit" size={20} />
              )
            }
            color="primary"
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {t('form.Save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

OrganizationInviteDialog.defaultProps = {
  open: false,
}

OrganizationInviteDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}
