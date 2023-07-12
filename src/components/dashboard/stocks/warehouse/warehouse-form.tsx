import { Box, FormHelperText, Grid, Typography } from '@mui/material'
import EditableTextInput from '@/components/EditableTextInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'

type WarehouseFormProps = {
  initialValues?: Partial<Warhouse>
  isEditMode?: boolean
  isDraftMode?: boolean
  fromId?: string
  onSubmit: (data: Partial<WarehouseFormData>) => void
}
function WarehouseForm({
  initialValues,
  isEditMode = false,
  fromId,
  onSubmit,
}: WarehouseFormProps) {
  const { t } = useTranslation()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      location: initialValues?.location || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('form.FieldRequired')),
      location: Yup.string().required(t('form.FieldRequired')),
    }),
    onSubmit: (values) => {
      const data: WarehouseFormData = {
        name: values.name,
        location: values.location,
      }
      onSubmit && onSubmit({ ...data })
    },
  })

  const submitFormEditMode = () => {
    if (isEditMode) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(formik.submitForm, 200)
    }
  }

  const errorName = formik.touched.name && formik.errors.name
  const errorLocation = formik.touched.location && formik.errors.location
  return (
    <Box id={fromId} component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography
              sx={{ width: 100 }}
              color={'inherit'}
              variant="subtitle2"
              component="div"
            >
              {t('Attributes.Name')}
            </Typography>
            <EditableTextInput
              typographyProps={{
                height: 28,
                pt: '2px',
                variant: 'body2',
                width: '100%',
              }}
              sx={{ fontSize: 'inherit', pt: 0 }}
              fullWidth
              placeholder="Empty"
              name="name"
              value={formik.values.name}
              textValue={formik.values.name}
              onChange={formik.handleChange}
              onBlur={submitFormEditMode}
            />
          </Box>
          {errorName && (
            <FormHelperText sx={{ ml: '95px' }} error={Boolean(errorName)}>
              {errorName}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" gap={2} alignItems="flex-start">
            <Typography
              sx={{ width: 100 }}
              color="inherit"
              variant="subtitle2"
              component="div"
            >
              {t('Attributes.Location')}
            </Typography>
            <EditableTextInput
              typographyProps={{
                height: 28,
                pt: '2px',
                variant: 'body2',
                width: '100%',
              }}
              sx={{ fontSize: 'inherit', pt: 0 }}
              fullWidth
              placeholder="Empty"
              name="location"
              value={formik.values.location}
              textValue={formik.values.location}
              onChange={formik.handleChange}
              onBlur={submitFormEditMode}
            />
          </Box>
          {errorLocation && (
            <FormHelperText sx={{ ml: '95px' }} error={Boolean(errorLocation)}>
              {errorLocation}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default WarehouseForm
