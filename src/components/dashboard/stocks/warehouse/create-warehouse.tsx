import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useCreateWarehouseMutation } from '@/queries/warehouse'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import WarehouseForm from './warehouse-form'

function CreateWarehouse({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const { t } = useTranslation()
  const createMutation = useCreateWarehouseMutation()

  const onSubmit = async (data: Partial<WarehouseFormData>) => {
    return toast.promise(createMutation.mutateAsync(data), {
      loading: t('toast.Creating'),
      success: () => {
        onSuccess && onSuccess()
        toggleOpen()
        return t('toast.CreatedSuccessfully')
      },
      error: (err: any) => {
        return err?.response?.data?.message || ''
      },
    })
  }
  return (
    <>
      <Button onClick={toggleOpen} variant="contained" startIcon={<AddIcon />}>
        {t('Create')}
      </Button>

      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle sx={{ p: 2 }}>{t('Create Warehouse')}</DialogTitle>
        <Box sx={{ p: 2 }}>
          <WarehouseForm fromId="warehouse-form" onSubmit={onSubmit} />
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={toggleOpen} color="inherit">
            {t('Cancel')}
          </Button>
          <Button form="warehouse-form" type="submit" variant="contained">
            {t('Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateWarehouse
