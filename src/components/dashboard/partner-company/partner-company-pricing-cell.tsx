import { InputField } from '@/components/input-field'
import { dinarFormat } from '@/utils/formats'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react'

const useStyles = makeStyles({
  priceInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      padding: 0,
      textAlign: 'center !important',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
  },
})

type CompProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent) => void
  value?: string | number
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  name: string
}
const PartnerCompanyPricingCell = (props: CompProps) => {
  const { onChange, onKeyDown, value, onBlur, name } = props
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  if (!editMode) {
    return (
      <Box
        sx={{ cursor: 'text', minWidth: '120px' }}
        onClick={() => setEditMode(true)}
      >
        <Typography variant="subtitle2" color="textSecondary">
          {dinarFormat(value)}
        </Typography>
      </Box>
    )
  }
  return (
    <InputField
      autoFocus
      type="number"
      step="01"
      onChange={onChange}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key !== 'Enter') return
        setEditMode(false)
        onKeyDown(e)
      }}
      name={name}
      onBlur={(e: FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur(e)
      }}
      className={classes.priceInput}
      InputProps={{
        sx: {
          height: 25,
          width: '100px',
          bgcolor: 'red',
          padding: '0 !important',
          boxShadow: 'none !important',
        },
        disableUnderline: true,
      }}
      value={value}
    />
  )
}

export default PartnerCompanyPricingCell
