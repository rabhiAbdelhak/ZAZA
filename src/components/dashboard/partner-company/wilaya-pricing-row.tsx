import { InputField } from '@/components/input-field'
import { CircularProgress, Skeleton, TableCell, TableRow } from '@mui/material'
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import PartnerCompanyPricingCell from './partner-company-pricing-cell'

type CompProps = {
  pricing: any
  pricingLoading: boolean
  updatePrices?: (value: number, attr: string, wilaya_id: number) => void
}

const CommunePricingRow = (props: CompProps) => {
  const { pricing, updatePrices, pricingLoading } = props
  const [field, setField] = useState({ value: 0, attr: '' })
  const [currentPricing, setCurrentPricing] = useState() as any

  useEffect(() => {
    pricing && setCurrentPricing(pricing)
  }, [pricing])

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name !== field.attr) return
    if (!updatePrices) return
    updatePrices(field.value, field.attr, 1)
    setField({ value: 0, attr: '' })
  }
  const handleClickEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (!updatePrices) return
    updatePrices(field.value, field.attr, 1)
    setField({ value: 0, attr: '' })
  }

  if (pricingLoading || !currentPricing) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow>
      <TableCell>{pricing.commune_name}</TableCell>
      <TableCell>
        <PartnerCompanyPricingCell
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setField({ value: parseFloat(e.target.value), attr: 'price' })
            setCurrentPricing((prev: any) => {
              return {
                ...prev,
                price: e.target.value ? parseFloat(e.target.value) : 0,
              }
            })
          }}
          onKeyDown={(e: KeyboardEvent) =>
            field.attr === 'price' && handleClickEnter(e)
          }
          name="price"
          onBlur={handleBlur}
          value={currentPricing?.price}
        />
      </TableCell>
      <TableCell>
        <PartnerCompanyPricingCell
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCurrentPricing((prev: any) => {
              return {
                ...prev,
                cod_price: e.target.value ? parseFloat(e.target.value) : 0,
              }
            })
            setField({ value: parseFloat(e.target.value), attr: 'cod_price' })
          }}
          onKeyDown={(e: KeyboardEvent) =>
            field.attr === 'cod_price' && handleClickEnter(e)
          }
          name="cod_price"
          onBlur={handleBlur}
          value={currentPricing?.['cod_price']}
        />
      </TableCell>
      <TableCell>
        <PartnerCompanyPricingCell
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCurrentPricing((prev: any) => {
              return {
                ...prev,
                return_price: e.target.value ? parseFloat(e.target.value) : 0,
              }
            })
            setField({
              value: parseFloat(e.target.value),
              attr: 'return_price',
            })
          }}
          onBlur={handleBlur}
          name="return_price"
          onKeyDown={(e: KeyboardEvent) =>
            field.attr === 'return_price' && handleClickEnter(e)
          }
          value={currentPricing?.['return_price']}
        />
      </TableCell>
    </TableRow>
  )
}

export default CommunePricingRow
