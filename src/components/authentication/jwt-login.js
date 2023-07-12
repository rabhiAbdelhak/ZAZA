import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material'
import { InputField } from '../input-field'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export const JWTLogin = () => {
  
  const { login } = useAuth()
  const { t } = useTranslation()

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('ValidEmail')
        .max(255)
        .required('EmailRequired'),
      password: Yup.string().max(255).required('PasswordRequired'),
    }),
    onSubmit: async (values, helpers) => {
      return login(values.email, values.password)
        .then((data) => {
          const returnUrl = router.query.returnUrl || '/dashboard/orders/'
          router.push(returnUrl).catch(console.error)
          console.log(data)
        })
        .catch((err) => {
          helpers.setStatus({ success: false })
          if(err.response.status==422)
          helpers.setErrors({ submit: 'wrong credentials ' }) // need a proper error responce 
          else
          helpers.setErrors({ submit: 'internal server error' })
          helpers.setSubmitting(false)
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: 3,
        }}
      >
        <Typography color="textPrimary" variant="h4">
          {t('login.Login')}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={
              formik.touched.email &&
              formik.errors.email &&
              t(`login.${formik.errors.email}`)
            }
            label={t('login.Email address')}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={
              formik.touched.password &&
              formik.errors.password &&
              t(`login.${formik.errors.password}`)
            }
            label={t('login.Password')}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
        </Grid>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              color: 'primary.contrast',
              '&:hover': {
                backgroundColor: 'primary.800',
              },
            }}
          >
            {t('login.Log In')}
          </Button>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </form>
  )
}
