import { InputField } from '@/components/input-field'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SupplierForm from './supplier-form'
import { useState } from 'react'
import {
  useAssignSupplierProductsMutation,
  useCreateSupplierMutation,
} from '@/queries/supplier'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Query } from '@/components/query'
import QueryChipFilter from '@/components/QueryChipFilter'

function CreateSupplier({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const addSupplierMutation = useCreateSupplierMutation()
  const assignProductMutation = useAssignSupplierProductsMutation()
  const { t } = useTranslation()

  const onSubmit = (data: any, helpers: any) => {
    const { products = [], ...otherData } = data

    const sendData = async () => {
      const supp = await addSupplierMutation.mutateAsync(otherData)
      if (products.length) {
        await assignProductMutation.mutateAsync({
          supplierId: supp.id,
          products,
        })
      }
    }

    return toast.promise(sendData(), {
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

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { height: '100%' } }}
      >
        <DialogContent sx={{ p: 2 }}>
          <SupplierForm formId="supplier-create-form" onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            disabled={addSupplierMutation.isLoading}
            onClick={toggleOpen}
            color="inherit"
          >
            {t('Cancel')}
          </Button>
          <Button
            type="submit"
            form="supplier-create-form"
            disabled={addSupplierMutation.isLoading}
            variant="contained"
          >
            {t('Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

type SupplierListFilterProps = {
  filter: SupplierListFilter
  onFilter: (filter: SupplierListFilter) => void
}

function SupplierListFilter({ filter, onFilter }: SupplierListFilterProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Query
          value={filter['filter[name]'] || ''}
          placeholder={t("Search by name")}
          onChange={(search) =>
            onFilter({ ...filter, 'filter[name]': search, page: 0 })
          }
        />

        <QueryChipFilter
          sx={{ mt: 1 }}
          onDelete={() => onFilter({ ...filter, 'filter[name]': '', page: 0 })}
          label={filter['filter[name]']}
        />
      </Box>
      <Box>
        <CreateSupplier onSuccess={() => onFilter({ page: 0 })} />
      </Box>
    </Box>
  )
}

export default SupplierListFilter
