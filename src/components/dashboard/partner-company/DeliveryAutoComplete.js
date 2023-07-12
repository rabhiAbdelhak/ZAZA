import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Chip, TextField, alpha } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Downshift from 'downshift'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.15, 0.25),
  },
}))

export default function DeliveryAutoComplete({ ...props }) {
  const classes = useStyles()
  const { selectedTags, placeholder, tags, ...other } = props
  const [inputValue, setInputValue] = useState('')
  const [selectedItem, setSelectedItem] = useState([])
  useEffect(() => {
    setSelectedItem(tags)
  }, [tags])
  useEffect(() => {
    selectedTags(selectedItem)
  }, [selectedItem, selectedTags])

  function handleKeyDown(event) {
    if (event.which === 32) {
      const newSelectedItem = [...selectedItem]
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim(),
      )

      if (duplicatedValues !== -1) {
        setInputValue('')
        return
      }
      if (!event.target.value.replace(/\s/g, '').length) return

      newSelectedItem.push(event.target.value.trim())
      setSelectedItem(newSelectedItem)
      setInputValue('')
    }
    if (
      selectedItem?.length &&
      !inputValue?.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }
  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({ getInputProps }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder,
        })
        return (
          <div>
            <TextField
              fullWidth
              variant="standard"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'background.paper',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    theme.palette.mode == 'light'
                      ? 'neutral.300'
                      : 'neutral.700',
                  borderRadius: 1,
                  height: 45,
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
                    px: 0.5,
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
              InputLabelProps={{
                sx: {
                  color: 'text.primary',
                  fontSize: 14,
                  fontWeight: 500,
                  mb: 1,

                  position: 'relative',
                  transform: 'none',
                },
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: selectedItem?.map((item) => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: (event) => {
                  handleInputChange(event)
                  onChange(event)
                },
                onFocus,
              }}
              {...other}
              {...inputProps}
            />
          </div>
        )
      }}
    </Downshift>
  )
}

DeliveryAutoComplete.defaultProps = {
  tags: [],
}
DeliveryAutoComplete.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
