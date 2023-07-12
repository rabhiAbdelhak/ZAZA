import { InputField } from '@/components/input-field'
import { Box, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import DeliveryCompanyAdd from './delivery-company-add'

type CompProps = {
  onSubmit: (data: PartnerCompany) => void
}

const PartnerCompanyCreationForm = (props: CompProps) => {
  const { onSubmit } = props
  const { t } = useTranslation()
  const formik = useFormik<PartnerCompanyFormData>({
    initialValues: {
      name: '',
      phone: '',
      delivery_types: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),
      phone: Yup.string().required(t('form.FieldRequired')),
      delivery_types: Yup.array()
        .max(10, 'Provide Only 10 types')
        .min(1, 'Provide atleast one type')
        .required('Provide atleas one type'),
    }),
    onSubmit: (values: any) => {
      onSubmit({ ...values })
    },
  })
  function handleSelectedTags(items: any) {
    formik.values.delivery_types = items
  }
  function SubmitFormFormik(event: any) {
    event.key === 'Enter' && event.preventDefault()
    formik.handleSubmit()
  }

  const handleDeleteDeliveryType = (type: DeliveryType) => {
    const newDeliveryTypes =
      formik.values?.delivery_types?.filter((t) => {
        return t?.name !== type.name
      }) || []

    formik.setFieldValue('delivery_types', newDeliveryTypes)
  }

  const handleAddDeliveryType = (type: DeliveryType) => {
    const newDeliveryTypes = formik.values?.delivery_types
      ? [...formik.values?.delivery_types, type]
      : [type]
    formik.setFieldValue('delivery_types', newDeliveryTypes)
  }

  return (
    <>
      <Box
        id={'create-partner-company-form'}
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          py: 2,
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: '500px',
        }}
      >
        <InputField
          fullWidth
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          type="text"
          name="name"
          value={formik.values.name}
          label={t('Attributes.Name')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          fullWidth
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          name="phone"
          value={formik.values.phone}
          type="text"
          label={t('Attributes.Phone Number')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <DeliveryCompanyAdd
          HandleAddType={handleAddDeliveryType}
          handleDeleteType={handleDeleteDeliveryType}
          deliveryTypes={formik.values?.delivery_types || []}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            form="create-partner-company-form"
            type="submit"
            disabled={Boolean(formik?.errors?.delivery_types)}
          >
            {t('Validate')}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default PartnerCompanyCreationForm
