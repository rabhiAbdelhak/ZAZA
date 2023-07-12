import { Box, IconButton, InputAdornment } from '@mui/material'
import { InputField } from './input-field'
import CloseIcon from '@mui/icons-material/Close'

function InputFieldFilter({ value, onClear, ...otherProps }) {
  return (
    <Box>
      <InputField
        value={value}
        {...otherProps}
        InputProps={{
          ...(value && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClear} size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </Box>
  )
}

export default InputFieldFilter
