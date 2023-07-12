import AvatarUpload from '@/components/AvatarUpload'
import {
  Box,
  Divider,
  FormHelperText,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import EditableTextInput from '../../EditableTextInput'
import LaunchIcon from '@mui/icons-material/Launch'
import SupplierAddressList from './supplier-address-list'
import { Scrollbar } from '@/components/scrollbar'
import SupplierContactList from './supplier-contact-list'
import { InputField } from '@/components/input-field'
import { FormikHelpers, useFormik } from 'formik'
import { ReactNode } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import SupplierProducts from './supplier-products'
import SupplierDetailsPayment from '../supplier-payment/supplier-details-payment'

export const getSupplierData = (data?: Supplier) => {
  return {
    name: data?.name || '',
    logo: data?.logo || '',
    website: data?.website || '',
    comment: data?.comment || '',
    addresses: data?.addresses || [],
    contacts: data?.contacts || [],
    products: data?.products || [],
  }
}
type SupplierFormProps = {
  initialValues?: Supplier
  onSubmit: (
    data: Partial<Supplier>,
    helpers: FormikHelpers<ReturnType<typeof getSupplierData>>,
  ) => void
  rightAction?: ReactNode
  formId?: string
  editMode?: boolean
  disabled?: boolean
}

function SupplierForm({
  initialValues,
  onSubmit,
  rightAction,
  formId,
  editMode = false,
  disabled = false,
}: SupplierFormProps) {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: getSupplierData(initialValues),
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('form.MinLength', { min: 3 }))
        .required(t('form.FieldRequired')),

      comment: Yup.string().min(10, t('form.MinLength', { min: 10 })),
    }),
    onSubmit: (data, helpers) => onSubmit(data, helpers),
  })

  const sendFieldForm =
    (
      field: keyof {
        name: string
        logo: string
        website: string
        comment: string
        addresses: { id: number; commune: Commune; street: string }
      },
    ) =>
    () => {
      if (editMode && formik.values[field] !== formik.initialValues?.[field]) {
        formik.submitForm()
      }
    }

  return (
    <Box component="form" id={formId} onSubmit={formik.handleSubmit}>
      <Box display="flex" gap={2}>
        <Box flexGrow={1} display="flex" gap={1} alignItems="center">
          <Box>
            <AvatarUpload
              disabled={disabled}
              size={70}
              src={formik.values.logo}
              onChange={(value) => formik.setFieldValue('logo', value)}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <EditableTextInput
              disabled={disabled}
              typographyProps={{
                variant: 'h4',
              }}
              onChange={formik.handleChange}
              value={formik.values.name}
              textValue={formik.values.name}
              placeholder="Supplier name"
              error={Boolean(formik.touched.name && formik.errors.name)}
              name="name"
              fullWidth
              onBlur={sendFieldForm('name')}
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                component={Link}
                href={formik.values?.website}
                target="_blank"
                size="small"
                disabled={!formik.values?.website}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
              <EditableTextInput
                disabled={disabled}
                typographyProps={{
                  variant: 'body2',
                  sx: { flexGrow: 1 },
                }}
                onChange={formik.handleChange}
                value={formik.values.website}
                textValue={formik.values.website}
                placeholder="https://website.com"
                name="website"
                fullWidth
                error={Boolean(formik.touched.website && formik.errors.website)}
                onBlur={sendFieldForm('website')}
              />
            </Box>
          </Box>
        </Box>
        <Box pr={1} pt={1}>
          {rightAction}
        </Box>
      </Box>
      <FormHelperText
        sx={{ ml: '85px' }}
        error={Boolean(
          (formik.touched.name && formik.errors.name) ||
            (formik.touched.website && formik.errors.website),
        )}
      >
        {(formik.touched.name && formik.errors.name) ||
          (formik.touched.website && formik.errors.website)}
      </FormHelperText>

      <Box display="flex" flexDirection={'column'}>
        <Box display="flex" gap={4}>
          <SupplierAddressList
            disabled={disabled}
            editMode={editMode}
            supplierId={initialValues?.id}
            sx={{ flex: 2 }}
            addresses={formik.values.addresses}
            onChange={(value) => formik.setFieldValue('addresses', value)}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ flex: '1 1 100%', mt: 2.5 }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              Note
            </Typography>
            <InputField
              fullWidth
              sx={{ flex: 1, mt: 2 }}
              maxRows={6}
              minRows={4}
              name="comment"
              onChange={formik.handleChange}
              value={formik.values.comment}
              error={Boolean(formik.touched.comment && formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
              multiline
              onBlur={sendFieldForm('comment')}
            />
          </Box>
        </Box>
        <Divider sx={{ py: 2 }} />

        {initialValues?.id && editMode && (
          <Box mt={2}>
            <SupplierDetailsPayment supplier={initialValues} />
            <Divider sx={{ py: 2 }} />
          </Box>
        )}

        <SupplierContactList
          editMode={editMode}
          disabled={disabled}
          supplierId={initialValues?.id}
          contacts={formik.values.contacts}
          onChange={(value) => formik.setFieldValue('contacts', value)}
        />
        <Divider sx={{ py: 2 }} />

        <SupplierProducts
          products={formik.values.products}
          disabled={disabled}
          supplierId={editMode ? initialValues?.id : undefined}
          onChange={(products) => formik.setFieldValue('products', products)}
        />
      </Box>
    </Box>
  )
}

export default SupplierForm
