import { Box, Button, Container, Grid, Switch, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import * as Yup from 'yup'

//local imports
import CommuneAutocomplete from '../../CommuneAutocomplete'
import DeliveryPriceInput from '../../delivery-price-input'
import { InputField } from '../../input-field'
import ProductsSelection from '../products-selection'
import OrderDelivery from './OrderDelivery'

const boxStyle = { display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }
const sectionStyle = {
  p: 3,
  border: '1px solid',
  borderRadius: '15px',
  borderColor: 'divider',
}

const EcOrderCreateForm = ({
  selectedProducts,
  handleComplete,
  handleAddProduct,
  handleRemoveProduct,
  onChangeProductAmount,
  onChangeProductPrice,
  setValidated,
  onStepperFinished,
  setCurrentOrder,
  onCreate,
}) => {
  const [directValidation, setDirectValidation] = useState(false)
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      client_first_name: '',
      client_last_name: '',
      client_phone: '',
      client_phone2: '',
      delivery_company_id: '',
      client_address: '',
      commune: null,
      order_id: '',
      delivery_type_id: '',
      delivery_distinaton_id: '',
      source: '',
      can_be_opened: false,
      notes: '',
      free_delivery: false,
      delivery_type_name: '',
      office_id: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      client_first_name: Yup.string().required('Please Enter your First Name!'),
      client_last_name: Yup.string().required('Please Enter your Last Name!'),
      client_address: Yup.string().required(
        'Please Enter your Complete Adress!',
      ),
      client_phone: Yup.string().required('Please Enter your Phone Number'),
      commune: Yup.object().nullable().required('Please Select a Comune'),
    }),
    onSubmit: (values) => {
      const products = selectedProducts.map((item) => ({
        product_id: item.id,
        quantity: item.amount,
        name: item.name,
        price: item.price,
        image: item.image,
        selling_price: item.selling_price,
      }))
      const commune_id = values.commune?.id
      const wilaya_id = values.commune?.wilaya?.id
      const commune = values.commune?.name
      const wilaya = values.commune?.wilaya.name
      const order = {
        ...values,
        commune_id,
        wilaya_id,
        commune,
        wilaya,
        package_type: 2,
        products,
      }

      if (directValidation) {
        const orderToCreate = { ...order }
        delete orderToCreate.delivery_type_name
        const products = orderToCreate.products.map((product) => {
          const { product_id, quantity, selling_price } = product
          return { product_id, quantity, price: selling_price }
        })
        orderToCreate.products = products
        onCreate(orderToCreate)
        setValidated?.(true)
        onStepperFinished?.()
        setDirectValidation(false)
        return
      }
      setCurrentOrder({
        ...order,
      })
      handleComplete(1)
    },
  })

  const handeleDeliveryChange = ({
    delivery_type_id,
    delivery_type_name,
    office_id,
  }) => {
    formik.setFieldValue('delivery_type_id', delivery_type_id)
    formik.setFieldValue('delivery_type_name', delivery_type_name)
    formik.setFieldValue('office_id', office_id)
  }
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box sx={{ ...sectionStyle, height: '100%' }}>
            <Typography variant="h5" color="text.ptimary">
              2. {t('orders.Customer information')}
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
                error={Boolean(
                  formik.touched.client_address && formik.errors.client_address,
                )}
                helperText={
                  formik.touched.client_address && formik.errors.client_address
                }
                type="text"
                name="client_address"
                label={t('Attributes.Address')}
                value={formik.values.client_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box sx={sectionStyle} mb={2}>
            <Typography variant="h5" color="text.ptimary">
              3. {t('orders.Order Info')}
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
                label={t('Attributes.Order Number')}
              />
              <InputField
                error={Boolean(formik.touched.source && formik.errors.source)}
                helperText={formik.touched.source && formik.errors.source}
                type="text"
                name="source"
                onChange={formik.handleChange}
                value={formik.values.source}
                label={
                  t('Attributes.Lead Source') + ' (Instagram, Facebook...)'
                }
              />
            </Box>
          </Box>
          <Box sx={sectionStyle}>
            <Typography variant="h5" color="text.primary" mb={3}>
              4. {t('orders.Delivery information')}
            </Typography>
            <CommuneAutocomplete
              autoComplete="off"
              error={Boolean(formik.touched.commune && formik.errors.commune)}
              helperText={formik.touched.commune && formik.errors.commune}
              autoSelect
              label={t('Attributes.Town')}
              name="commune"
              onChange={(e, value) => {
                formik.setFieldValue('commune', value)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.commune}
              sx={{ mb: 3 }}
            />
            {formik.values.commune !== null && (
              <OrderDelivery
                onChangeValue={formik.handleChange}
                wilayaId={formik.values?.commune?.id}
                typeId={formik.values.delivery_type_id}
                handeleDeliveryChange={handeleDeliveryChange}
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
                {t('Attributes.FreeDelivery')}
              </Typography>
              <Switch
                size="small"
                name="free_delivery"
                checked={formik.values.free_delivery}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
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
              multiline
              name="notes"
              label={t('Attributes.Note')}
              InputProps={{ sx: { minHeight: '55px' } }}
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <ProductsSelection
          handleAdd={handleAddProduct}
          handleRemove={handleRemoveProduct}
          selectedProducts={selectedProducts}
          handleComplete={handleComplete}
          onChangeAmount={onChangeProductAmount}
          onChangePrice={onChangeProductPrice}
        />
      </Grid>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          //disabled={!selectedProducts.length}
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
          sx={{ color: 'primary.contrast' }}
        >
          {t('orders.See Resume')}
        </Button>
        <Button
          disabled={!selectedProducts.length}
          variant="contained"
          color="primary"
          onClick={() => {
            setDirectValidation(true)
            formik.handleSubmit()
          }}
          sx={{ color: 'primary.contrast' }}
        >
          {t('orders.Validate Order')}
        </Button>
      </Box>
    </Container>
  )
}

export default EcOrderCreateForm
