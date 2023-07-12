import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { InputField } from '../../input-field'
import * as authAPI from '../../../api/auth'
import { useTranslation } from 'react-i18next'

export const AccountChangePassword = (props) => {
  const { t } = useTranslation()

  const passwordSchema = (msg = '') =>
    Yup.string()
      .min(6, t(`form.PasswordMinRequired`, { min: 6 }))
      .required(msg)

  const formik = useFormik({
    initialValues: {
      password: '',
      oldPassword: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      password: passwordSchema(t('form.NewPasswordRequired')),
      oldPassword: passwordSchema(t('form.OldPasswordRequired')),
    }),
    onSubmit: async (values, helpers) =>
      authAPI
        .changePassword(values)
        .then(() => {
          toast.success('toast.SavedSuccessfully')
          helpers.resetForm()
          helpers.setStatus({ success: true })
        })
        .catch((err) => {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err.response?.data?.message })
        })
        .finally(() => helpers.setSubmitting(false)),
  })

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={5} xs={12}>
            <Typography color="textPrimary" variant="h6">
              {t('accountPage.ChangePassword')}
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    error={Boolean(
                      formik.touched.oldPassword && formik.errors.oldPassword,
                    )}
                    fullWidth
                    helperText={
                      formik.touched.oldPassword && formik.errors.oldPassword
                    }
                    label={t('form.OldPassword')}
                    name="oldPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.oldPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    error={Boolean(
                      formik.touched.password && formik.errors.password,
                    )}
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label={t('form.NewPassword')}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Grid>
                {formik.errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disabled={formik.isSubmitting}
                    endIcon={
                      formik.isSubmitting && (
                        <CircularProgress
                          size={20}
                          color="inherit"
                          thickness={6}
                        />
                      )
                    }
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t('form.Save')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
