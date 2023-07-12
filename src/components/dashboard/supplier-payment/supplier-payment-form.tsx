import { InputField } from '@/components/input-field'
import { Box } from '@mui/material'
import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SupplierPaymentAutocomplete from './supplier-payement-autocomplete'
import { useSupplierDetailsQuery } from '@/queries/supplier'
import { useRef } from 'react'
type SupplierPaymentFormProps = {
  formId?: string
  onSubmit: (data: { date: string; amount: number; supplier: Supplier }) => void
  initValues?: Partial<SupplierPayment>
  initSupplier?: Supplier
  withAutoComplete?: boolean
}

function SupplierPaymentForm({
  formId,
  onSubmit,
  initValues,
  withAutoComplete = false,
  initSupplier,
}: SupplierPaymentFormProps) {
  const { t } = useTranslation()

  const maxAmountRef = useRef<number>(0)

  const formik = useFormik({
    initialValues: {
      date: initValues?.date || '',
      supplier: initSupplier,
      amount: initValues?.amount || initSupplier?.rest_to_pay,
      maxAmount: initSupplier?.rest_to_pay,
    },
    validationSchema: Yup.object({
      supplier: Yup.mixed().required(t('form.FieldRequired')),
      date: Yup.date().required(t('form.FieldRequired')),
      amount: Yup.number()
        .required(t('form.FieldRequired'))
        .min(1, t('form.FieldRequired'))
        .max(Yup.ref('maxAmount'), `max amount is ${maxAmountRef.current}`),
    }),
    onSubmit: (data) => {
      if (data.amount && data.date) {
        onSubmit({
          amount: data.amount,
          date: data.date,
          supplier: data.supplier as Supplier,
        })
      }
    },
  })

  const disabled = withAutoComplete && !formik.values.supplier

  console.log(formik.values)

  return (
    <Box
      id={formId}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {withAutoComplete && (
        <SupplierPaymentAutocomplete
          placeholder="Search Supplier..."
          error={Boolean(formik.touched.supplier && formik.errors.supplier)}
          helperText={formik.touched.supplier && formik.errors.supplier}
          value={formik.values.supplier as Supplier}
          onChange={(supplier) => {
            formik.setFieldValue('supplier', supplier)
            formik.setFieldValue('amount', supplier?.rest_to_pay || 0)
            formik.setFieldValue('maxAmount', supplier?.rest_to_pay || 0)
            maxAmountRef.current = supplier?.rest_to_pay || 0
            setTimeout(
              () => formik.setFieldTouched('maxAmount', true, true),
              100,
            )
          }}
        />
      )}

      <InputField
        disabled={disabled}
        defaultValue={formik.values.date}
        label="Date"
        type="date"
        name="date"
        error={Boolean(formik.touched.date && formik.errors.date)}
        inputProps={{ max: formatISO(new Date(), { representation: 'date' }) }}
        onChange={formik.handleChange}
        helperText={formik.touched.date && formik.errors.date}
      />

      <InputField
        disabled={disabled}
        value={formik.values.amount}
        label="Amount"
        type="number"
        name="amount"
        error={Boolean(formik.touched.amount && formik.errors.amount)}
        inputProps={{ min: 1, max: formik.values.supplier?.rest_to_pay }}
        onChange={formik.handleChange}
        helperText={formik.touched.amount && formik.errors.amount}
      />
    </Box>
  )
}

export default SupplierPaymentForm
