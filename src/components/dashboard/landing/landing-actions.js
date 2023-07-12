import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LandingDeleteConfirmation from './landing-confirmation-dialog'

const LandingActions = ({ onDelete, onEdit, landingid }) => {
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false)
  const { t } = useTranslation()

  const handleDelete = () => {
    setOpenDeleteConfirmationDialog(true)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button variant="text">{t('Edit')}</Button>
      <div style={{ height: '20px', width: '3px', background: 'black' }}></div>
      <Button variant="text" onClick={handleDelete}>
        {t('Delete')}
      </Button>
      <LandingDeleteConfirmation
        open={openDeleteConfirmationDialog}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        onConfirm={() => onDelete(landingid)}
      />
    </Box>
  )
}

export default LandingActions
