import { Typography } from '@mui/material'
import React from 'react'

const DiscountTypography = ({ discount }) => {
  return (
    <Typography
      variant="caption"
      bgcolor="success.main"
      color="primary.contrast"
      sx={{
        padding: '5px',
        width: '40px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30px',
      }}
    >
      {discount}%
    </Typography>
  )
}

export default DiscountTypography
