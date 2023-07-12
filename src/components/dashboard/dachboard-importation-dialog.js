import { AllInbox, CheckCircle, CheckRounded } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { X as XIcon } from '../../icons/x'

const ImportaionDialog = ({
  open,
  onClose,
  entity,
  importError: error,
  importFile,
  initializeImportationErrors,
  dispatch,
  uploading,
  template,
}) => {
  const [sent, setSent] = useState(false)
  const formik = useFormik({
    initialValues: {
      file: '',
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData()
      formData.append('file', values.file)
      importFile(formData)
      //importFile(formData)(dispatch);
      setSent(true)
      setTimeout(() => {
        setSent(false)
        resetForm()
        //initializeImportationErrors()(dispatch);
        initializeImportationErrors()
      }, 5000)
    },
  })
  const { t } = useTranslation()
  const handleConfirmation = () => {
    initializeImportationErrors()
    setSent(false)
    formik.setFieldValue('file', null)
    onClose()
  }

  const renderContent = () => {
    if (error && formik.values.file) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            color="error"
            xs={{ textTransform: 'capitalize' }}
          >
            {error.message || 'Error While trying to handle the File'}
          </Typography>
          <Button
            variant="text"
            onClick={() => {
              formik.resetForm()
              initializeImportationErrors()
              setSent(false)
            }}
          >
            ({t('Try Again')})
          </Button>
        </Box>
      )
    }
    if (sent && !error && !uploading && formik.values.file) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <CheckCircle color="success" />
          <Typography variant="h4" color="textPrimary">
            {entity || t('File')} {t('Imported Succesfully')}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {t('The Lines you imported will appear in the Management section.')}
          </Typography>
          <Button size="small" onClick={handleConfirmation} variant="text">
            {t('Take me to')} {t(entity)}
          </Button>
        </Box>
      )
    }

    if (uploading) {
      return (
        <Typography variant="overline">
          {t('Importing your file...')}
        </Typography>
      )
    }

    return (
      <>
        <AllInbox />
        {!formik.values.file ? (
          <Typography variant="body1" color="textPrimary">
            {t('Click on the button to select a file to upload')}
          </Typography>
        ) : (
          <Typography variant="body2" color="textPrimary">
            {t('File to Import')} :{' '}
            <Typography variant="caption">{formik.values.file.name}</Typography>
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          {!formik.values.file ? (
            <label id="upload-file">
              <input
                type="file"
                onChange={(e) =>
                  formik.setFieldValue('file', e.target.files[0])
                }
                id="upload-file"
                name="file"
                style={{ display: 'none' }}
              />
              <Button variant="outlined" color="primary" component="span">
                {t('Browse Files')}
              </Button>
            </label>
          ) : (
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              sx={{ color: 'primary.contrast' }}
            >
              {t('Upload')}
            </Button>
          )}
        </form>
      </>
    )
  }
  return (
    <Dialog
      open={open}
      onClose={() => onClose?.()}
      PaperProps={{
        sx: {
          maxWidth: 700,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="inherit" color="textPrimary">
          {t('Import')} {t(entity)}
        </Typography>
        <IconButton onClick={() => onClose?.()} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '70%' }}>
            <Typography variant="h5" color="textPrimary">
              {t('Use the template file to import')}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {t(
                'In order to import correctly, we provide you with a template that you can fill and upload.',
              )}
            </Typography>
          </Box>
          <Link href={template}>
            <Button
              variant="text"
              size="small"
              color="info"
              sx={{ textTransform: 'uppercase' }}
            >
              {t('Download Template')}
            </Button>
          </Link>
        </Box>
      </Alert>
      <DialogContent
        sx={{
          py: 4,
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
        }}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}

export default ImportaionDialog
