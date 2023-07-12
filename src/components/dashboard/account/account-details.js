import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { InputField } from '../../input-field'
import { useAuth } from '../../../providers/AuthProvider'
import CommuneAutocomplete from '../../CommuneAutocomplete'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const AccountDetails = (props) => {
  const { user, updateUser } = useAuth()
  const ref = useRef()
  const { t } = useTranslation()

  const isStoreAccount = user?.roles?.toLowerCase() === 'store'

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      name: user?.name || '',
      phone: user?.phone || '',
      commune: user?.commune || null,
      avatar: user?.avatar || '',
      address: user?.address || '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('form.MustBeAvalidEmail'))
        .max(255)
        .required(t('form.EmailRequired')),
      address: Yup.string()
        .max(350, t('form.MustBeAvalidAddress'))
        .required(t('form.AddressRequired')),
      phone: Yup.string()
        .max(14, t('form.MustBeAvalidPhone'))
        .required(t('form.PhoneRequired')),
      commune: Yup.mixed().required(t('form.CommuneRequired')),
      avatar: Yup.mixed(),
      ...(isStoreAccount && {
        name: Yup.string().max(255).required(t('form.AvatarRequired')),
      }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { name, ...otherValues } = values
        const dataToSend = isStoreAccount ? otherValues : values
        await updateUser(dataToSend)
        toast.success(t('toast.SavedSuccessfully'))
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
      } catch (err) {
        console.error(err)
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err?.response?.data?.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const avatar = useMemo(
    () =>
      formik.values.avatar instanceof File
        ? globalThis?.window?.URL?.createObjectURL(formik.values.avatar) || ''
        : formik.values.avatar,
    [formik.values.avatar],
  )

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={5} xs={12}>
            <Typography color="textPrimary" variant="h6">
              {t('accountPage.Settings')}
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    pb: 3,
                  }}
                >
                  <Avatar
                    alt={formik.values.name}
                    src={avatar}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  />
                  <div>
                    <Grid container spacing={1} sx={{ pb: 1 }}>
                      <Grid item>
                        <Button
                          htmlFor="avatarInput"
                          color="primary"
                          size="small"
                          type="button"
                          variant="outlined"
                          onClick={() => ref.current?.click()}
                        >
                          {t('form.UploadNewPicture')}
                        </Button>
                        <input
                          onChange={(e) =>
                            formik.setFieldValue('avatar', e.target.files[0])
                          }
                          accept="image/png, image/jpeg"
                          ref={ref}
                          id="avatarInput"
                          type="file"
                          hidden
                        />
                      </Grid>
                      {/* <Grid item>
                        <Button color="primary" size="small" type="button" variant="text">
                          Delete
                        </Button>
                      </Grid> */}
                    </Grid>
                    {/* <Typography color="textSecondary" variant="caption">
                      Recommended dimensions: 200x200, maximum file size: 5MB
                    </Typography> */}
                  </div>
                </Box>
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
                      disabled={isStoreAccount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      error={Boolean(
                        formik.touched.email && formik.errors.email,
                      )}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label={t('form.EmailAddress')}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      error={Boolean(
                        formik.touched.phone && formik.errors.phone,
                      )}
                      fullWidth
                      helperText={formik.touched.phone && formik.errors.phone}
                      label={t('form.PhoneNumber')}
                      name="phone"
                      type="tel"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CommuneAutocomplete
                      error={Boolean(
                        formik.touched.commune && formik.errors.commune,
                      )}
                      helperText={
                        formik.touched.commune && formik.errors.commune
                      }
                      autoSelect
                      label="Commune"
                      name="commune"
                      placeholder="search by commune name"
                      onChange={(e, value) =>
                        formik.setFieldValue('commune', value)
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.commune}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      error={Boolean(
                        formik.touched.address && formik.errors.address,
                      )}
                      fullWidth
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      label={t('form.Address')}
                      name="address"
                      multiple
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.address}
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
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {t('form.Save')}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
