import { getDeliveryTypes } from '@/api/delivery'
import { InputField } from '@/components/input-field'
import { Add, Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import toast from 'react-hot-toast'

type CompProps = {
  HandleAddType: (type: DeliveryType) => void
  deliveryTypes: DeliveryType[]
  handleDeleteType: (type: DeliveryType) => void
}

const colors = ['#000', '#f53', '#f56', '#f24']

const DeliveryCompanyAdd = (props: CompProps) => {
  const { deliveryTypes = [], HandleAddType, handleDeleteType } = props
  const [deliveryType, setDeliveryType] = useState({
    name: '',
    color: colors[0],
  })

  const addType = () => {
    const names = deliveryTypes.map((t: DeliveryType) => t.name)
    if (names.includes(deliveryType.name)) {
      toast.error('Type name existed')
      return
    }
    HandleAddType(deliveryType)
  }
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          p: 1,
        }}
      >
        <InputField
          type="text"
          name="name"
          placeholder="Delivery type name..."
          value={deliveryType.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDeliveryType((prev) => ({ ...prev, name: e.target.value }))
          }
          sx={{
            flex: 1,
          }}
        />
        <InputField
          select
          name="color"
          value={deliveryType.color}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDeliveryType((prev) => ({ ...prev, color: e.target.value }))
          }
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              <Box
                sx={{
                  borderRadius: '3px',
                  height: '15px',
                  width: '30px',
                  backgroundColor: color,
                }}
              ></Box>
            </MenuItem>
          ))}
        </InputField>
        <IconButton
          size="small"
          color="primary"
          disabled={!deliveryType.name}
          component={Button}
          onClick={addType}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <Add />
        </IconButton>
      </Box>
      <CardContent>
        <Box
          sx={{
            maxHeight: '200px',
            overflow: 'auto',
            display: 'flex',
            flexDraw: 'draw',
            gap: 1,
          }}
        >
          {deliveryTypes.length ? (
            deliveryTypes.map((type: DeliveryType) => {
              return (
                <Chip
                  key={type.id}
                  label={type.name}
                  onDelete={() => handleDeleteType(type)}
                />
              )
            })
          ) : (
            <Typography
              sx={{ textAlign: 'center', width: '100%' }}
              variant="caption"
              color="warning.main"
            >
              You did not create any type yet
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default DeliveryCompanyAdd
