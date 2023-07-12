import {
  Box,
  FormHelperText,
  Grid,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import EditableTextInput from '@/components/EditableTextInput'
// import WarhouseSelect from '../supplier/supplier-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'
import ExitVoucherProducts from './exit-voucher-products'
import WarehouseSelect from '../../warhouse/warehouse-select'
import VoucherPrintModal from './PDFVoucher/VoucherPrintModal'
import PDFVoucher from './PDFVoucher/PDFVoucher'
import { PDFViewer } from '@react-pdf/renderer'

type ExitVoucherFormProps = {
  initialValues?: Partial<ExitVoucher>
  isEditMode?: boolean
  isDraftMode?: boolean
  fromId?: string
  onSubmit: (data: Partial<ExitVoucherFormData>) => void
}
function ExitVoucherForm({
  initialValues,
  isEditMode = false,
  isDraftMode = true,
  fromId,
  onSubmit,
}: ExitVoucherFormProps) {
  const { t } = useTranslation()
  const [print, setPrint] = useState<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const formik = useFormik({
    initialValues: {
      warehouse: {
        id: initialValues?.warehouse_id,
        name: initialValues?.warehouse_name,
        location: initialValues?.warehouse_location,
      },
      products: initialValues?.products || [],
      ref: initialValues?.ref,
      comment: initialValues?.comment || '',
      date: initialValues?.date || '',
    },
    validationSchema: Yup.object({
      warehouse: Yup.mixed().required(t('form.FieldRequired')),
      products: Yup.array()
        .min(1, t('form.FieldRequired'))
        .required(t('form.FieldRequired')),
      date: Yup.date().required(t('form.FieldRequired')),
    }),
    onSubmit: (values) => {
      const data: ExitVoucherFormData = {
        products: values.products,
        comment: values.comment,
        ref: values.ref,
        warehouse_id: values.warehouse?.id,
        date: values.date,
      }
      const newProducts = values.products.map((pr) => ({
        product_id: pr.product_id,
        quantity: pr.quantity,
        name: pr.name,
      }))
      onSubmit && onSubmit({ ...data, products: newProducts })
    },
  })
  const canRender = Boolean(window !== undefined && open)

  const submitFormEditMode = () => {
    if (isEditMode) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(formik.submitForm, 200)
    }
  }

  const handlePrint = () => {
    setPrint(formik?.initialValues)
  }
  const closePrint = () => {
    setPrint(null)
  }
  const errorWarhouse = formik.touched.warehouse && formik.errors.warehouse
  const errorProduct = formik.touched.products && formik.errors.products
  const errorDate = formik.touched.date && formik.errors.date
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
              Warehouse
            </Typography>
            <WarehouseSelect
              error={Boolean(errorWarhouse)}
              disabled={!isDraftMode}
              selected={formik.values?.warehouse as Warhouse}
              onSelected={(warehouse) => {
                formik.setValues({
                  ...formik.values,
                  warehouse: warehouse as Warhouse,
                  products: [],
                })
              }}
              placeholder="Empty"
            />
          </Box>
          {errorWarhouse && (
            <FormHelperText sx={{ ml: '95px' }} error={Boolean(errorWarhouse)}>
              {errorWarhouse}
            </FormHelperText>
          )}
          <Box display="flex" gap={2} alignItems="center">
            <Typography
              sx={{ width: 100 }}
              color="inherit"
              variant="subtitle2"
              component="div"
            >
              Date
            </Typography>
            <EditableTextInput
              error={Boolean(errorDate)}
              typographyProps={{
                height: 28,
                pt: '2px',
                variant: 'body2',
                width: '100%',
              }}
              sx={{ fontSize: 'inherit', pt: 0 }}
              fullWidth
              placeholder="Empty"
              name="date"
              type="date"
              value={formik.values.date}
              textValue={formik.values.date}
              onChange={formik.handleChange}
              onBlur={submitFormEditMode}
            />
          </Box>
          {errorDate && (
            <FormHelperText sx={{ ml: '95px' }} error={Boolean(errorDate)}>
              {errorDate}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography
              sx={{ width: 100 }}
              color="inherit"
              variant="subtitle2"
              component="div"
            >
              Ref
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
              name="origin"
              // ^^ put ref instead of origin when backend fixes it above ^^
              value={formik.values.ref}
              textValue={formik.values.ref}
              onChange={formik.handleChange}
              onBlur={submitFormEditMode}
            />
          </Box>
          <Box display="flex" gap={2} alignItems="flex-start">
            <Typography
              sx={{ width: 100, mt: '2px' }}
              color="inherit"
              variant="subtitle2"
              component="div"
            >
              Note
            </Typography>
            <EditableTextInput
              multiline
              typographyProps={{
                minHeight: 28,
                pt: '2px',
                variant: 'body2',
                width: '100%',
              }}
              sx={{ fontSize: 'inherit', pt: 0 }}
              fullWidth
              placeholder="Empty"
              name="comment"
              value={formik.values.comment}
              textValue={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={submitFormEditMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ExitVoucherProducts
            error={Boolean(errorProduct)}
            warehouseId={formik.values?.warehouse?.id}
            disabled={!formik.values.warehouse || !isDraftMode}
            products={formik.values.products}
            onChange={(v) => formik.setFieldValue('products', v)}
            onBlur={submitFormEditMode}
          />
          {errorProduct && (
            <FormHelperText error={Boolean(errorProduct)}>
              {errorProduct}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Box
        sx={{
          height: 40,

          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="outlined" onClick={handlePrint}>
          Print Voucher
        </Button>
      </Box>
      {/* {canRender && (
        <PDFViewer>
          <PDFVoucher dataprint={formik.values} />
        </PDFViewer>
      )} */}
      <VoucherPrintModal
        open={Boolean(print)}
        data={print}
        onClose={closePrint}
        typeOfDocument={'ExitVouchers'}
      />
    </Box>
  )
}

export default ExitVoucherForm
