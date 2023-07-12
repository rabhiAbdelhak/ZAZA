import { Add } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PaymentBulkActions = ({ selectedPayments }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openBulk = Boolean(anchorEl)
  const { t } = useTranslation()

  const handleClickBulk = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseBulk = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="payments-button"
        disabled={!(selectedPayments?.length > 0)}
        sx={{
          order: {
            sm: 1,
            xs: 2,
          },
        }}
        aria-controls={openBulk ? 'payments-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openBulk ? 'true' : undefined}
        onClick={handleClickBulk}
        startIcon={<Add />}
      >
        {t('Bulk Actions')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openBulk}
        onClose={handleCloseBulk}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseBulk}>Action 1</MenuItem>
        <MenuItem onClick={handleCloseBulk}>Action2</MenuItem>
        <MenuItem onClick={handleCloseBulk}>Action3</MenuItem>
      </Menu>
    </>
  )
}

export default PaymentBulkActions
