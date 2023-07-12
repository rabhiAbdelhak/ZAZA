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
import { useState } from 'react'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../../../contexts/global context/Provider'

//local imports
import { X as XIcon } from '../../../icons/x'

const PackageImportationDialog = ({ open, onClose, entity }) => {
  const {
    ordersState: { loading: uploading, importError: error },
  } = useGlobaleStateContext()
  const { ordersDispatch: dispatch } = useGlobaleDispatchContext()
  const [sent, setSent] = useState(false)
  const formik = useFormik({
    initialValues: {
      file: '',
    },
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('file', values.file)
      setSent(true)
    },
  })

  const handleConfirmation = () => {
    setSent(false)
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
              formik.setFieldValue('file', null)
              setSent(false)
            }}
          >
            Try Again
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
            {entity || 'File'} Imported Succesfully
          </Typography>
          <Typography variant="caption" color="textSecondary">
            The packages you imported will appear in the Packages section.
          </Typography>
          <Button size="small" onClick={handleConfirmation} variant="text">
            Take me to {entity}
          </Button>
        </Box>
      )
    }

    if (uploading) {
      return <div>Importing your file...</div>
    }

    return (
      <>
        <AllInbox />
        {!formik.values.file ? (
          <Typography variant="body1" color="textPrimary">
            Click on the button to select a file to upload
          </Typography>
        ) : (
          <Typography variant="body2" color="textPrimary">
            File to Import :{' '}
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
                Browse Files
              </Button>
            </label>
          ) : (
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              sx={{ color: 'primary.contrast' }}
            >
              Upload
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
          Import Packages
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
              Use the template file to import
            </Typography>
            <Typography variant="body2" color="textPrimary">
              In order to import correctly, we provide you with a template that
              you can fill and upload.
            </Typography>
          </Box>
          <Button variant="text" color="info">
            DOWNLOAD TEMPLATE
          </Button>
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

export default PackageImportationDialog
