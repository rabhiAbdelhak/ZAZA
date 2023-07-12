import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { X as XIcon } from '@/icons/x'
import { useTranslation } from 'react-i18next'
import { InputField } from '@/components/input-field'
import { useFormik } from 'formik'
import { useEffect } from 'react'

type ImportationDialogFilterProps = {
  open?: boolean
  onClose?: () => void
  filter?: PackageImportationListFilter
  onFilter?: (filter?: PackageImportationListFilter) => void
}

const defaultValue = {
  'filter[created_from]': '',
  'filter[created_to]': '',
}

function ImportationDialogFilter(props: ImportationDialogFilterProps) {
  const { onClose, open = false, filter, onFilter } = props
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      created_from: filter?.['filter[created_from]'] || '',
      created_to: filter?.['filter[created_to]'] || '',
    },
    onSubmit: (data) => {
      if (onFilter) {
        onFilter({
          'filter[created_from]': data.created_from || '',
          'filter[created_to]': data.created_to || '',
        })
        if (onClose) {
          onClose()
        }
      }
    },
  })

  useEffect(() => {
    if (open) {
      formik.setFieldValue(
        'created_from',
        filter?.['filter[created_from]'] || '',
      )
      formik.setFieldValue('created_to', filter?.['filter[created_to]'] || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const resetForm = () => {
    formik.setFieldValue('created_from', defaultValue['filter[created_from]'])
    formik.setFieldValue('created_to', defaultValue['filter[created_to]'])
  }

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <Typography color="textPrimary" variant="inherit">
            {t('Filters.Filter')}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('Filters.CreatedDates')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched?.created_from && formik.errors?.created_from,
                )}
                helperText={
                  formik.touched?.created_from && formik.errors?.created_from
                }
                type="date"
                label={t('Attributes.From')}
                name="created_from"
                value={formik.values?.created_from}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputField
                fullWidth
                error={Boolean(
                  formik.touched?.created_to && formik.errors?.created_to,
                )}
                helperText={
                  formik.touched?.created_to && formik.errors?.created_to
                }
                type="date"
                label={t('Attributes.From')}
                name="created_to"
                value={formik.values?.created_to}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="text" onClick={resetForm}>
            {t('Reset')}
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {t('Apply')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ImportationDialogFilter
