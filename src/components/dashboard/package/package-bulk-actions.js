import { Add } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PackageBulkActions = ({ selectedPackages, onPrint }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openBulk = Boolean(anchorEl)
  const { t } = useTranslation()
  const handleClickBulk = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseBulk = () => {
    setAnchorEl(null)
  }

  const handlePrint = () => {
    handleCloseBulk()
    onPrint && onPrint()
  }

  return (
    <>
      <Button
        id="orders-button"
        disabled={!(selectedPackages?.length > 0)}
        sx={{
          order: {
            sm: 1,
            xs: 2,
          },
        }}
        aria-controls={openBulk ? 'orders-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openBulk ? 'true' : undefined}
        onClick={handleClickBulk}
        startIcon={<Add />}
      >
        {t('Bulk Action')}
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
        <MenuItem onClick={handlePrint}>
          {t('Print')} ({selectedPackages?.length})
        </MenuItem>
      </Menu>
    </>
  )
}

export default PackageBulkActions
