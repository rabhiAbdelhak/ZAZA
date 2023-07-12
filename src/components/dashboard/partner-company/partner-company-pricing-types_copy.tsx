import { InputField } from '@/components/input-field'
import { usePartnerCompanyPricingQuery } from '@/queries/partner-company'
import {
  Box,
  Card,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PartnerCompanyPricingAdd from './partner-company-pricing-add-dialog'
import TypeSelection from './type-selection'
import WilayaPricingRow from './wilaya-pricing-row'

type CompProps = {
  nextStep?: () => void
  partnerCompany: PartnerCompany
  inDrawer?: boolean
}
const PartnerCompanyPricingTypes = (props: CompProps) => {
  const { nextStep, partnerCompany, inDrawer } = props
  const [openDialog, setOpenDialog] = useState(false)

  console.log(partnerCompany)

  const [currentType, setCurrentType] = useState<DeliveryType | undefined>(
    partnerCompany?.delivery_types?.[0],
  )

  const [currentPricing, setCurrentPricing] = useState<any[]>([])

  const { t } = useTranslation()
  const { data, isLoading } = usePartnerCompanyPricingQuery(partnerCompany?.id)

  useEffect(() => {
    const newPricing = data?.data
      ? data?.data.filter(
          (price: any) => price?.delivery_type_id === currentType?.id,
        )
      : []
    setCurrentPricing(newPricing)
  }, [currentType, data?.data])

  const handleTypeChange = (id: number) => {
    const type = partnerCompany?.delivery_types?.find((type) => type.id === id)
    setCurrentType(type)
  }

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" color="textPrimary">
          Delivery Company Pricing
        </Typography>
        <Box sx={{ width: '200px' }}>
          {partnerCompany?.delivery_types?.length && currentType && (
            <TypeSelection
              types={partnerCompany?.delivery_types}
              currentType={currentType}
              handleChange={handleTypeChange}
            />
          )}
        </Box>
        {currentType && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add a Pricing
          </Button>
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Attributes.Town')}</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Cod price</TableCell>
            <TableCell>Return price</TableCell>
          </TableRow>
        </TableHead>
        {Boolean(currentPricing.length) && (
          <TableBody>
            {currentPricing?.map((price) => {
              return (
                <WilayaPricingRow
                  key={price.id}
                  pricingLoading={isLoading}
                  pricing={price}
                />
              )
            })}
          </TableBody>
        )}
      </Table>
      {!currentPricing.length && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="caption"
            color="warning.main"
            sx={{ textAlign: 'center' }}
          >
            You did not price any town in type {currentType?.name}
          </Typography>
        </Box>
      )}
      {currentType && (
        <PartnerCompanyPricingAdd
          type={currentType}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          partnerCompany={partnerCompany}
        />
      )}
    </Card>
  )
}

export default PartnerCompanyPricingTypes
