import * as React from 'react'
import TextField from '@mui/material/TextField'
import MuiAutoComplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { alpha } from '@mui/system'
import { Chip } from '@mui/material'
import PropTypes from 'prop-types'
import { paymentStatusVariants } from '../../../constants/pacakges-statuses'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material/node'
import { StatusBadge } from '../../status-badge'

export default function PaiementStatusAutocomplete(props) {
  const {
    error,
    helperText,
    label,
    placeholder,
    multiple = false,
    ...other
  } = props

  const { t } = useTranslation()

  return (
    <MuiAutoComplete
      sx={{
        '& .MuiFilledInput-root .MuiFilledInput-input': {
          px: 1.5,
          py: 0.75,
        },
      }}
      autoSelect
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => (option?.name?.en ? t(option?.name?.en) : '')}
      options={paymentStatusVariants}
      multiple={multiple}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.id}
            variant="outlined"
            label={option.name}
            color={option.color}
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
              fontSize: 12,
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
      renderOption={(props, option) => (
        <Box {...props} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <StatusBadge color={option?.color} />
          <Typography noWrap variant="inherit" color={option?.color}>
            {t(option?.name?.en)}
          </Typography>
        </Box>
      )}
      freeSolo={false}
      includeInputInList
    />
  )
}

PaiementStatusAutocomplete.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
}
