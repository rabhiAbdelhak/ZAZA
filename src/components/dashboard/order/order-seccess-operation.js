import { CheckCircle } from '@mui/icons-material'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function OrderSuccessOperation({ open, message, onClose }) {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            gap: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CheckCircle color="success" sx={{ fontSize: '40px' }} />
          <Typography
            sx={{ textAlign: 'center' }}
            id="alert-dialog-modal-description"
            variant="subtitle1"
            color="text.primary"
          >
            {message}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push('/dashboard/packages')}
          >
            {t('packages.Packages Management')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
