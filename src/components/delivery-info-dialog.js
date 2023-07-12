import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { X as XIcon } from '../icons/x'
import DeliveryPriceInput from './delivery-price-input'
import OrderDelivery from '../components/dashboard/order/OrderDeliveryEdit'
import { InputField } from './input-field'
import GetCompaniesInput from './dashboard/order/OrderDeliveryEdit/GetCompaniesInput'

const DeliveryInfoDialog = ({ open, onClose, data, onSubmit }) => {
  const {
    can_be_opened,
    notes,
    delivery_type_id,
    wilaya_id,
    office_id,
    delivery_company_id,
    commune_id,
  } = data
  const { t } = useTranslation()
  {
    console.log(data)
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      can_be_opened: can_be_opened === 1 ? true : false,
      notes: notes || '',
      delivery_type_id: delivery_type_id || '',
      office_id: office_id || '',
      delivery_company_id: delivery_company_id,
      wilaya_id: wilaya_id || '',
      commune_id: commune_id || '',
      delivery_type_name: '',
      price: '',
    },
    onSubmit: (values, helpers) => {
      onSubmit({ ...values }, helpers)
      onClose?.()
    },
  })

  const handeleDeliveryChange = ({
    delivery_type_id,
    delivery_type_name,
    office_id,
    delivery_company_id,
    wilaya_id,
    commune_id,
    price,
  }) => {
    formik.setFieldValue('delivery_type_id', delivery_type_id)
    formik.setFieldValue('delivery_company_id', delivery_company_id)
    formik.setFieldValue('delivery_type_name', delivery_type_name)
    formik.setFieldValue('office_id', office_id)
    formik.setFieldValue('commune_id', commune_id)
    formik.setFieldValue('wilaya_id', wilaya_id)
    formik.setFieldValue('delivery_price', price)
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose?.()}
      PaperProps={{
        sx: {
          maxWidth: 700,
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
        <Typography color="text.primary" variant="inherit">
          {t('Edit')} {t('orders.Delivery information')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      {formik.values.delivery_company_id}
      <GetCompaniesInput
        wilayaId={formik.values?.communeId}
        companyId={formik.values.delivery_company_id}
        setFieldValue={formik.handleChange}
      />
      <OrderDelivery
        onChangeValue={formik.handleChange}
        wilayaId={formik.values?.communeId}
        typeId={formik.values.delivery_type_id}
        handeleDeliveryChange={handeleDeliveryChange}
        officeId={formik.values.office_id}
        companyId={formik.values.delivery_company_id}
        formik={formik}
        delivery_distinaton_id={formik.values.delivery_distinaton_id}
      />
      {/* <DialogContent>
        <Box sx={{ py: 2 }}>
          <DeliveryPriceInput
            wilayaId={wilaya_id}
            typeId={formik.values.delivery_type_id}
            onChange={handeleDeliveryChange}
            officeId={Number(formik.values.office_id)}
          />
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
              checked={formik.values.can_be_opened}
              onChange={() =>
                formik.setFieldValue(
                  'can_be_opened',
                  !formik.values.can_be_opened,
                )
              }
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
      </DialogContent> */}
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => onClose?.()}
        >
          {t('Cancel')}
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={formik.handleSubmit}
        >
          {t('Edit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeliveryInfoDialog
