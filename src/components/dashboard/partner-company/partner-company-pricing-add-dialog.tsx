import CommuneAutocomplete from '@/components/CommuneAutocomplete'
import { InputField } from '@/components/input-field'
import { Add } from '@mui/icons-material'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { usePartnerCompanAddPricingMutation } from '@/queries/partner-company'

type CompProps = {
  type?: DeliveryType
  open: boolean
  partnerCompany: PartnerCompany
  selectedCommunes: CommunePricesRow[]
  handleClose: () => void
}

const PartnerCompanyPricingAdd = (props: CompProps) => {
  const { handleClose, type, partnerCompany, open, selectedCommunes } = props
  const [currentCommune, setCurrentCommune] = useState<Commune>()
  const { t } = useTranslation()
  const mutation = usePartnerCompanAddPricingMutation()

  const handleAddPricing = (pricing: PartnerCompanyPricingForm) => {
    toast.promise(
      mutation.mutateAsync({ pricing, partnerCompanyId: partnerCompany.id }),
      {
        loading: 'Adding Prices...',
        success: (dataSuccess: PartnerCompany) => {
          handleClose()
          formik.resetForm()
          return 'Pricing successfully added'
        },
        error: (err) => err?.response.data.message,
      },
    )
  }
  const formik = useFormik({
    initialValues: {
      price: '',
      return_price: '',
      cod_price: '',
      commune_ids: selectedCommunes,
    },
    validationSchema: Yup.object({
      price: Yup.number().required(t('form.FieldRequired')),
      return_price: Yup.number().required(t('form.FieldRequired')),
      cod_price: Yup.number().required(t('form.FieldRequired')),
      commune_ids: Yup.array().required('Provide only one type'),
    }),
    onSubmit: (values) => {
      if (type?.id) {
        const commune_ids = formik.values.commune_ids.map(
          (com: CommunePricesRow) => com.commune_id,
        )
        const price = parseInt(values.price)
        const cod_price = parseInt(values.cod_price)
        const return_price = parseInt(values.return_price)
        handleAddPricing({
          delivery_type_id: type?.id,
          commune_ids,
          price,
          cod_price,
          return_price,
        })
      } else {
        toast.error('Please Select a type')
      }
    },
  })

  const handleDeleteCommune = (id: number) => {
    const newCommunes = formik.values.commune_ids.filter(
      (com: CommunePricesRow) => com.commune_id !== id,
    )

    formik.setFieldValue('commune_ids', newCommunes)
  }
  console.log(formik.values.commune_ids)
  const handleAddCommune = () => {
    if (
      !currentCommune ||
      formik.values.commune_ids.find((com: any) => com.id === currentCommune.id)
    ) {
      toast.error('Please Select an unselected commune!')
      return
    }
    formik.setFieldValue('commune_ids', [
      ...formik.values.commune_ids,
      currentCommune,
    ])
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h6">Company : </Typography>
          <Typography variant="body1" color="textSecondary">
            {partnerCompany?.name}
          </Typography>{' '}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h6">Type : </Typography>
          <Typography variant="body1" color="textSecondary">
            {type?.name}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          id="pricing-form"
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <InputField
            fullWidth
            error={Boolean(formik.touched.price && formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            type="number"
            name="price"
            label="Price"
            onChange={formik.handleChange}
          />
          <InputField
            fullWidth
            error={Boolean(
              formik.touched.return_price && formik.errors.return_price,
            )}
            helperText={
              formik.touched.return_price && formik.errors.return_price
            }
            type="number"
            name="return_price"
            label="Return Price"
            onChange={formik.handleChange}
          />
          <InputField
            fullWidth
            error={Boolean(formik.touched.cod_price && formik.errors.cod_price)}
            helperText={formik.touched.cod_price && formik.errors.cod_price}
            type="number"
            label="Cod Price"
            name="cod_price"
            onChange={formik.handleChange}
          />
        </Box>
        <Card>
          <CardHeader title="Communes" />
          <CardContent sx={{ mt: 0 }}>
            {/* <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              <CommuneAutocomplete
                sx={{ flex: 1 }}
                onChange={(e, value) => setCurrentCommune(value)}
              />
              <IconButton
                color="primary"
                size="medium"
                onClick={handleAddCommune}
                sx={{ border: '1px solid', borderColor: 'primary.main' }}
              >
                <Add />
              </IconButton>
            </Box> */}
            <Card
              sx={{
                display: 'flex',
                flexFlow: 'wrap',
                minHeight: '150px',
                maxHeight: '200px',
                gap: 1,
                p: 1,
              }}
            >
              {formik.values.commune_ids?.map((com: CommunePricesRow) => {
                return (
                  <Chip
                    key={com.commune_id}
                    label={com.commune_name}
                    onDelete={() => handleDeleteCommune(com.commune_id)}
                    sx={{ margin: '0 0' }}
                  />
                )
              })}
            </Card>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            type="submit"
            form="pricing-form"
            disabled={!formik.values.commune_ids.length}
          >
            Validate
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default PartnerCompanyPricingAdd
