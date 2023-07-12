import {
  Box,
  InputBase,
  InputBaseProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import { FocusEvent, KeyboardEvent, ReactNode, useState } from 'react'
import { InputField } from './input-field'

type EditableTextInputProps = Omit<InputBaseProps, 'value'> & {
  typographyProps?: Omit<TypographyProps, 'component' | 'value'>
  value?: string | number
  textValue?: string | number | null
  onPressEnter?: () => {}
  icon?: ReactNode
}
function EditableTextInput({
  typographyProps,
  placeholder,
  value,
  onBlur,
  multiline = false,
  error = false,
  disabled = false,
  textValue = '',
  onChange,
  onPressEnter,
  icon,
  ...other
}: EditableTextInputProps) {
  const [isEditing, setEditing] = useState(false)

  const openEditing = () => !disabled && setEditing(true)

  const closeEditing = () => {
    setEditing(false)
  }

  const blurHandler = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setEditing(false)
    if (onBlur) {
      onBlur(event)
    }
  }

  const handleKeyup = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !multiline) {
      if (onPressEnter) {
        onPressEnter()
      }
      closeEditing()
    }
  }

  if (isEditing) {
    return (
      <InputField
        fullWidth
        autoFocus
        placeholder={placeholder}
        {...other}
        value={value}
        onChange={onChange}
        multiline={multiline}
        onKeyUp={handleKeyup}
        onBlur={blurHandler}
      />
    )
  }

  return (
    <Typography
      {...typographyProps}
      noWrap={!multiline}
      sx={{
        display: 'block',
        ...typographyProps?.sx,
        cursor: !disabled ? 'pointer' : 'auto',
        color: error
          ? (theme) => theme.palette.error.main
          : placeholder && !textValue
          ? (theme) => theme.palette.grey[500]
          : 'auto',
        borderRadius: 1,
      }}
      onClick={openEditing}
    >
      <Box>
        {textValue || placeholder} {icon}
      </Box>
    </Typography>
  )
}

export default EditableTextInput
