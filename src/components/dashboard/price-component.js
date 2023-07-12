import { Edit } from '@mui/icons-material'
import { Box } from '@mui/material'
import { IconButton, Typography } from '@mui/material/node'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { dinarFormat, removeComma } from '../../utils/formats'
import { InputField } from '../input-field'

const PriceComponent = ({ value, handleChange, min }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [price, setPrice] = useState(value)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (price <= removeComma(min)) {
      toast.error(t('cart.Selling Price must be higher than Suggested price'))
      return
    }
    handleChange(price)
    setIsUpdating(false)
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError(null)
      setPrice(value)
    }, 3000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  if (isUpdating) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <InputField
          autoFocus
          onBlur={handleSubmit}
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          InputProps={{ sx: { width: '100px' } }}
        />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </form>
    )
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body2" color="textPrimary" noWrap>
        {dinarFormat(value)}
      </Typography>
      <IconButton size="small" onClick={() => setIsUpdating(true)}>
        <Edit sx={{ fontSize: '15px' }} />
      </IconButton>
    </Box>
  )
}

export default PriceComponent
