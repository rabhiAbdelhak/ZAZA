import { InputField } from '@/components/input-field'
import { MenuItem } from '@mui/material'
import { BoxProps } from '@mui/system'
import { BaseSyntheticEvent, ChangeEvent } from 'react'

type CompProps = {
  types: DeliveryType[]
  currentType?: DeliveryType
  handleChange: (id: number) => void
  sx: BoxProps['sx']
}
const TypeSelection = (props: CompProps) => {
  const { types, handleChange, currentType, ...other } = props
  return (
    <InputField
      {...other}
      fullWidth
      select
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(parseInt(e.target.value))
      }
      value={currentType?.id}
      name="type"
    >
      {types.map((type) => {
        return (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        )
      })}
    </InputField>
  )
}

export default TypeSelection
