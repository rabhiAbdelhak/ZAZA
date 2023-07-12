import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { alpha } from '@mui/system'
import { Box, Chip } from '@mui/material'
import { useAsync } from '../hooks/useAsync'
import * as helperAPI from '../api/helpers'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

export default function WilayaAutocomplete(props) {
  const { t } = useTranslation()
  const {
    error,
    helperText,
    filter,
    label,
    placeholder,
    multiple = false,
    ...other
  } = props
  const [open, setOpen] = React.useState(false)
  const {
    run,
    setData,
    data: options,
    isLoading,
  } = useAsync({ status: 'pending', data: [] })

  const loading = open && options.length === 0 && isLoading

  React.useEffect(() => {
    if (!loading) {
      return undefined
    }
    run(helperAPI.getWilayas())
      .then(setData)
      .catch((err) => console.log(err))
  }, [loading, run, setData])

  return (
    <Autocomplete
      sx={{
        '& .MuiFilledInput-root .MuiFilledInput-input': {
          px: 1.5,
          py: 0.75,
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) =>
        option.name
          ? option.name
          : options?.find((wilaya) => wilaya.id === filter.wilaya_id)?.name ||
            ''
      }
      options={options}
      loading={loading}
      multiple={multiple}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.id}
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          onChange={(e) => console.log(e)}
          helperText={helperText}
          label={label === null ? null : label ? label : t('orders.Wilaya')}
          placeholder={placeholder || t('orders.Search by wilaya')}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
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
