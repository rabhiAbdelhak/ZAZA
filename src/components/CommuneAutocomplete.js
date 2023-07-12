import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { alpha } from '@mui/system'
import { Box, Chip } from '@mui/material'
import PropTypes from 'prop-types'
import { useCommunesQuery } from '../queries/communes'
import { useTranslation } from 'react-i18next'

export default function CommuneAutocomplete(props) {
  const {
    error,
    helperText,
    label,
    placeholder,
    multiple = false,
    byWilayaIds = [],
    ...other
  } = props
  const [open, setOpen] = React.useState(false)

  const { data, isLoading } = useCommunesQuery({ enabled: open })

  const options = React.useMemo(
    () =>
      byWilayaIds.length
        ? data?.filter((el) => byWilayaIds.includes(el.wilaya.id)) || []
        : data || [],
    [byWilayaIds, data],
  )

  const loading = open && isLoading
  const { t } = useTranslation()
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
      autoSelect
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ''}
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
      renderOption={(props, option) => (
        <Box
          display="flex"
          alignItems="center"
          gap={4}
          component="li"
          {...props}
          key={option.id}
        >
          <Box flexGrow={1}>{option.name}</Box>
          <Chip
            size="small"
            sx={{ borderRadius: 8 }}
            variant="outlined"
            color="info"
            label={option?.wilaya?.name}
          />
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('Attributes.Town')}
          placeholder={placeholder || t('search_by_commune')}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            startAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} sx={{ mx: 1 }} />
                ) : null}
                {params.InputProps.startAdornment}
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

CommuneAutocomplete.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  multiple: PropTypes.bool,
  byWilayaIds: PropTypes.arrayOf(PropTypes.number),
  helperText: PropTypes.any,
  sx: PropTypes.any,
}
