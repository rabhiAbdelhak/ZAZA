import { InputField } from '@/components/input-field'
import { useWilayasQuery } from '@/queries/communes'
import { useDeliveryTypesQuery } from '@/queries/delivery'
import {
  usePartnerCompanyDetailsQuery,
  usePartnerCompanyPricingQuery,
  usePartnerCompanyUpdatePricingMutation,
} from '@/queries/partner-company'
import { Box, MenuItem, Typography, Divider } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import PartnerCompanyPricingTable from './partner-company-pricing-table'
import DeliveryTypesAutoComplete from './delivery-types-auto-complete'
import PartnerCompanyPackageVerification from './partner-company-package-verification'

type CompProps = {
  partnerCompany: PartnerCompany
  nextStep?: () => void
  inDrawer?: boolean
}

const PartnerCompanyPricing = (props: CompProps) => {
  const { partnerCompany, nextStep, inDrawer } = props
  const [currentDeliveryType, setCurrentDeliveryType] = useState<
    number | string
  >('')
  const { t } = useTranslation()
  useEffect(() => {
    if (partnerCompany) {
      setCurrentDeliveryType(partnerCompany?.delivery_types?.[0]?.id || '')
    }
  }, [partnerCompany])

  useEffect(() => {
    refetch()
  }, [currentDeliveryType, refetch])

  const id = partnerCompany ? partnerCompany?.id : undefined
  const { data: allDeliveryTypes, isLoading: typesLoading } =
    useDeliveryTypesQuery() as any

  const company_delivery_ids = partnerCompany.delivery_types?.map(
    (type: any) => type.id,
  )
  const partnerCompanyDeliveryTypes =
    allDeliveryTypes &&
    allDeliveryTypes.filter((type: DeliveryType) =>
      company_delivery_ids?.includes(type.id),
    )
  const {
    data: pricing,
    isLoading: pricingLoading,
    refetch,
  } = usePartnerCompanyPricingQuery(partnerCompany.id) as any

  useEffect(() => {
    refetch()
  }, [currentDeliveryType, refetch])

  const { data: wilayas, isLoading: wilayasLoading } = useWilayasQuery() as any

  const updatePricingMutation = usePartnerCompanyUpdatePricingMutation()

  const updatePrices = (value: number, attr: string, wilaya_id: number) => {
    if (!value && value !== 0) return
    let thePricing: any = {}
    partnerCompany?.delivery_types?.forEach((type: any) => {
      const typePricing = pricing.prices?.[type.id]?.reduce(
        (accu: any, item: any) => {
          const { cod_from, price, cod_price, return_price, wilaya_id } = item
          return {
            ...accu,
            [wilaya_id]: { price, cod_price, return_price, cod_from },
          }
        },
        {},
      )
      thePricing[type] = typePricing
    })
    console.log(thePricing)
    //thePricing[currentDeliveryType][wilaya_id][attr] = value
    partnerCompany.id &&
      toast.promise(
        updatePricingMutation.mutateAsync({
          prices: thePricing,
          partnerCompanyId: partnerCompany.id,
        }),
        {
          loading: t('Saving'),
          success: (data: any) => {
            return t('SavedSuccessfully')
          },
          error: (err: any) => {
            return err.response?.data.message
          },
        },
      )
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* <DeliveryTypesAutoComplete
        sx={{ width: '75%' }}
        DeliveryCompanyID={id}
        // value={formik.values.delivery_types}
        // handleChangeTypes={(types: DeliveryType[]) => {
        //   const newTypes = types.map((type) => type.id)
        //   formik.setFieldValue('delivery_types', newTypes)
        // }}
      /> */}
      <Divider sx={{ mt: 5 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          mt: 5,
        }}
      >
        <Typography variant="h5" color="textPrimary">
          Select the Type You want to Price
        </Typography>
        <InputField
          select
          value={currentDeliveryType}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrentDeliveryType(e?.target?.value)
          }
        >
          {partnerCompanyDeliveryTypes?.map((type: DeliveryType) => {
            return (
              <MenuItem value={type.id} key={type.id}>
                {type.name}
              </MenuItem>
            )
          })}
        </InputField>
      </Box>
      <Box>
        <PartnerCompanyPricingTable
          key={currentDeliveryType}
          nextStep={nextStep}
          inDrawer={inDrawer}
          pricingLoading={pricingLoading}
          isLoading={wilayasLoading}
          wilayas={wilayas}
          updatePrices={updatePrices}
          partnerCompany={partnerCompany}
          pricing={pricing?.prices?.[currentDeliveryType]}
        />
      </Box>
      {/* <Box>
        <PartnerCompanyPackageVerification />
      </Box> */}
    </Box>
  )
}

export default PartnerCompanyPricing
