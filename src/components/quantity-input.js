import { Add, Remove } from '@mui/icons-material'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'

//local imports
import { InputField } from './input-field'

const useStyles = makeStyles({
  valueInput: {
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

const QuantityInput = ({
  readOnly,
  value,
  max,
  disableText,
  handleAmountChange,
  label,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box>
      {label && (
        <Typography variant="body2" mt={2} mb={1}>
          {label}
        </Typography>
      )}
      {!disableText && (
        <Typography
          variant="caption"
          color={value <= max && value > 0 ? 'text.secondary' : 'error'}
          mb={0.6}
        >
          {value > 0
            ? `${max} ${t('cart.items available')}`
            : 'Oops! Negative Number'}
        </Typography>
      )}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: 'fit-content',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <IconButton
            sx={{ minHeight: 0, minWidth: 0, p: 1 }}
            onClick={() => handleAmountChange(value - 1)}
            disabled={value <= 1}
          >
            <Remove sx={{ fontSize: '18px' }} />
          </IconButton>
          <Divider orientation="vertical" variant="middle" flexItem />
          <InputField
            type="number"
            name="number"
            value={value}
            className={classes.valueInput}
            onChange={(e) => handleAmountChange(e.target.value)}
            InputProps={{
              inputProps: {
                max: 100,
                min: 0,
              },
              readOnly,
              sx: {
                border: 'none !important',
                padding: '0 !important',
                width: '40px',
                boxShadow: 'none !important',
              },
              disableUnderline: true,
            }}
          />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            bgcolor="divider"
          />
          <IconButton
            sx={{ minHeight: 0, minWidth: 0, p: 1 }}
            onClick={() => handleAmountChange(value + 1)}
            disabled={value >= max}
          >
            <Add sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default QuantityInput
