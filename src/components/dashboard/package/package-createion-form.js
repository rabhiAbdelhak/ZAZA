import { useFormik } from 'formik'
import { Box, Grid, Switch, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
//local imports
import { useGlobaleDispatchContext } from '../../../contexts/global context/Provider'
import useHelpers from '../../../hooks/use-helpers'
import CommuneAutocomplete from '../../CommuneAutocomplete'
//import DeliveryTypesInput from '../../delivery-types-input'
import { InputField } from '../../input-field'
import { packageApi } from '../../../api/package'
import toast from 'react-hot-toast'
import { useState } from 'react'
//import DeliveryPriceInput from '../../delivery-price-input'
import OrderDelivery from '../order/OrderDelivery'

const boxStyle = { display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }
const sectionStyle = {
  p: 3,
  border: '1px solid',
  borderRadius: '15px',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const PackageCreationForm = ({ setIsCreated }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const { orderDispatch: dispatch } = useGlobaleDispatchContext()
  const formik = useFormik({
    initialValues: {
      client_first_name: '',
      client_last_name: '',
      client_phone: '',
      client_phone2: '',
      price: '',
      adresse: '',
      commune: null,
      order_id: '',
      delivery_type_id: 1,
      delivery_price: 0,
      name: ``,
      delivery_distinaton_id: '',
      delivery_company_id: '',
      can_be_opened: false,
      observation: '',
      free_delivery: true,
      office_id: '',
      delivery_type_name: '',
      weight: '',
    },
    validationSchema: Yup.object({
      client_first_name: Yup.string().required('Please Enter your First Name!'),
      client_last_name: Yup.string().required('Please Enter your Last Name!'),
      adresse: Yup.string().required('Please Enter your Complete Adress!'),
      client_phone: Yup.string().required('Please Enter your Phone Number'),
      commune: Yup.object().nullable().required('Please Select a Comune'),
      name: Yup.string().required('Please Enter a product name !'),
      weight: Yup.number().required('Please Enter the package weight !'),
      price: Yup.number().required('Please Enter the package price !'),
    }),
    onSubmit: (values) => {
      const commune_id = values.commune?.id
      const wilaya_id = values.commune?.wilaya?.id
      setIsLoading(true)
      packageApi
        .createPackage({
          ...values,
          delivery_type: values.delivery_type_name,
          commune: commune_id,
          wilaya: wilaya_id,
        })
        .then((data) => {
          if (data.error) {
            if (typeof data.message === 'string') {
              toast.error(data.message)
            }
            setIsLoading(false)
            return
          }
          toast.success('Package created!')
          setIsCreated(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    },
  })

  const handleDeliveryTypeChange = ({
    delivery_type_id,
    delivery_type_name,
    office_id,
    price,
  }) => {
    formik.setFieldValue('delivery_type_id', delivery_type_id)
    formik.setFieldValue('delivery_type_name', delivery_type_name)
    formik.setFieldValue('office_id', office_id)
    formik.setFieldValue('delivery_price', price)
  }

  const helpers = useHelpers(
    formik.values.commune?.wilaya?.id,
    formik.setFieldValue,
  )
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box sx={{ ...sectionStyle, height: '100%' }}>
            <Typography variant="h5" color="text.ptimary">
              1. {t('orders.Customer information')}
            </Typography>
            <Box sx={boxStyle}>
              <InputField
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
              <InputField
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
              <InputField
                error={Boolean(formik.touched.adresse && formik.errors.adresse)}
                helperText={formik.touched.adresse && formik.errors.adresse}
                type="text"
                name="adresse"
                label={t('Attributes.Address')}
                value={formik.values.adresse}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box sx={sectionStyle} mb={2}>
            <Typography variant="h5" color="text.ptimary">
              2. {t('packages.Package Info')}
            </Typography>
            <Box sx={boxStyle}>
              <InputField
                error={Boolean(
                  formik.touched.order_id && formik.errors.order_id,
                )}
                helperText={formik.touched.order_id && formik.errors.order_id}
                type="text"
                name="order_id"
                value={formik.values.order_id}
                onChange={formik.handleChange}
                label={t('packages.Package Number')}
              />
              <InputField
                error={Boolean(formik.touched.price && formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                type="number"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                label={t('Attributes.Price')}
              />
              <InputField
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label={t('Attributes.Product Name')}
              />
            </Box>
          </Box>
          <Box sx={sectionStyle}>
            <Typography variant="h5" color="text.primary" mb={3}>
              3. {t('orders.Delivery information')}
            </Typography>
            <CommuneAutocomplete
              autoComplete="off"
              error={Boolean(formik.touched.commune && formik.errors.commune)}
              helperText={formik.touched.commune && formik.errors.commune}
              autoSelect
              label={t('Attributes.Town')}
              name="commune"
              placeholder="Search by commune name"
              onChange={(e, value) => formik.setFieldValue('commune', value)}
              onBlur={formik.handleBlur}
              value={formik.values.commune}
            />
            {/* <DeliveryPriceInput
              wilayaId={formik.values?.commune?.wilaya?.id}
              typeId={formik.values.delivery_type_id}
              onChange={handleDeliveryTypeChange}
              officeId={formik.values.office_id}
            /> */}
            {formik.values.commune !== null && (
              <OrderDelivery
                onChangeValue={formik.handleChange}
                wilayaId={formik.values?.commune?.id}
                typeId={formik.values.delivery_type_id}
                handeleDeliveryChange={handleDeliveryTypeChange}
                officeId={formik.values.office_id}
                companyId={formik.values.delivery_company_id}
                formik={formik}
                delivery_distinaton_id={formik.values.delivery_distinaton_id}
              />
            )}
            <Box
              sx={{
                my: 3,
                bgcolor: 'neutral.100',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle2" color="text.primary">
                {t('Attributes.Package can be opened')}
              </Typography>
              <Switch
                size="small"
                name="can_be_opened"
                checked={formik.values.can_be_opened}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <InputField
              fullWidth
              error={Boolean(formik.touched.weight && formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
              type="number"
              name="weight"
              onChange={formik.handleChange}
              value={formik.values.weight}
              label={t('Attributes.Weight')}
              sx={{ my: 3 }}
            />
            <InputField
              fullWidth
              multiline
              name="observation"
              label={t('Attributes.Note')}
              InputProps={{ sx: { minHeight: '55px' } }}
              value={formik.values.observation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Grid>
      </Grid>
      <Button
        disabled={isLoading}
        variant="contained"
        color="primary"
        onClick={formik.handleSubmit}
        sx={{ float: 'right', color: 'primary.contrast', my: 2 }}
      >
        {t('Validate')}
      </Button>
    </>
  )
}

export default PackageCreationForm
