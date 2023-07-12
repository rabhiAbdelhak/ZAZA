import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { alpha } from '@mui/system'
import { Chip } from '@mui/material'
import PropTypes from 'prop-types'
import { usePackagesTypesQuery } from '../../../queries/package'

export default function PackageTypesAutocomplete(props) {
  const {
    error,
    helperText,
    label,
    placeholder,
    multiple = false,
    ...other
  } = props
  const [open, setOpen] = React.useState(false)

  const { data, isLoading } = usePackagesTypesQuery({ enabled: open })

  return (
    <Autocomplete
      sx={{
        '& .MuiFilledInput-root .MuiFilledInput-input': {
          px: 1.5,
          py: 0.75,
        },
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      autoSelect
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option?.name || ''}
      options={data || []}
      loading={isLoading}
      multiple={multiple}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option?.id}
            variant="outlined"
            label={option?.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
          }}
          variant="filled"
          InputLabelProps={{
            shrink: true,
            sx: {
              color: 'text.primary',
              fontSize: 14,
              fontWeight: 500,
              mb: 0.5,
              position: 'relative',
              transform: 'none',
            },
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'background.paper',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: (theme) =>
                theme.palette.mode == 'light' ? 'neutral.300' : 'neutral.700',
              borderRadius: 1,
              boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
              '&.MuiAutocomplete-inputRoot': {
                p: 0,
              },
              transition: (theme) =>
                theme.transitions.create(['border-color', 'box-shadow']),
              '&:hover': {
                backgroundColor: 'background.paper',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
                boxShadow: (theme) =>
                  `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
              },
              '& .MuiFilledInput-input': {
                fontSize: 14,
                height: 'unset',
                lineHeight: 1.6,
                px: 1.5,
                py: 0.75,
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                boxShadow: 'none',
                borderColor: alpha('#D6DBE1', 0.5),
              },
              ':not(.MuiInputBase-adornedStart)': {
                p: 0,
              },
            },
          }}
        />
      )}
      {...other}
      freeSolo={false}
    />
  )
}

PackageTypesAutocomplete.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
}
