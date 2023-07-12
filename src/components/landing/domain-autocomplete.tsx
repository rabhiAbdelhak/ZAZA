import { useDomainsQuery } from '@/queries/domains'
import { Autocomplete, TextField, alpha } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type DomainSelectProps = {
  value?: Pick<Domain, 'id' | 'name'>[]
  onChange?: (domain: Pick<Domain, 'id' | 'name'>[]) => void
  error?: boolean
  helperText?: string
  fullWidth?: boolean
}

function DomainAutocomplete({
  value = [],
  onChange,
  error = false,
  helperText,
  fullWidth = false,
}: DomainSelectProps) {
  const [open, setOpen] = useState(false)
  const {
    data,
    isLoading,
    error: queryError,
  } = useDomainsQuery({ enabled: open })

  const { t } = useTranslation()

  const changeHandler = (
    event: any,
    value: Pick<Domain, 'id' | 'name'>[] | Domain[],
  ) => {
    if (!onChange) {
      return
    }
    const pickedValue: Pick<Domain, 'id' | 'name'>[] = value.map((el) => ({
      id: el.id,
      name: el.name,
    }))
    onChange(pickedValue)
  }

  return (
    <Autocomplete
      sx={{
        '& .MuiFilledInput-root .MuiFilledInput-input': {
          px: 1.5,
          py: 0.75,
        },
      }}
      autoSelect
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ''}
      options={data || []}
      loading={isLoading}
      multiple
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          error={Boolean(queryError) || error}
          helperText={queryError ? String(queryError) : helperText}
          label={t('domain.domain')}
          placeholder={t('domain.searchDomain')}
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
      freeSolo={false}
      onChange={changeHandler}
    />
  )
}

export default DomainAutocomplete
