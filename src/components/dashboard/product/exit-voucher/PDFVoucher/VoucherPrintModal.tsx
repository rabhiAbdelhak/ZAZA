import { X as CloseIcon } from '../../../../../icons/x'
import {
  AppBar,
  Box,
  Container,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'
import { PDFViewer } from '@react-pdf/renderer'
import PDFVoucher from './PDFVoucher'

import { useAuth } from '@/providers/AuthProvider'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const VoucherPrintModal = ({
  data = [],
  open = false,
  onClose,
  typeOfDocument,
}: any) => {
  const { user } = useAuth()
  const canRender = Boolean(data?.length && window !== undefined && open)

  const [printFormat, setPrintFormat] = useState('a4')

  const { t } = useTranslation()

  const isA6Format = printFormat === 'a6'

  const handleFormatChange = (event: any) => {
    setPrintFormat(event.target.value)
  }

  useEffect(() => {
    if (!open) {
      setPrintFormat('a4')
    }
  }, [open])

  return (
    <Dialog fullWidth maxWidth="lg" open={open}>
      <AppBar
        sx={{
          position: 'relative',
          backgroundColor: (theme) => theme.palette.background.default,
          color: 'text.primary',
        }}
      >
        <Toolbar variant="dense">
          <Typography sx={{ flexGrow: 1, mr: 2 }} variant="h4">
            {t('print.Print')}
          </Typography>
          <IconButton edge="start" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <PDFViewer style={{ height: 'calc(100vh - 96px)', width: '100%' }}>
        <PDFVoucher typeOfDocument={typeOfDocument} dataprint={data} />
      </PDFViewer>

      {/* <Container maxWidth="xs" sx={{ py: 2 }}>
        <InputLabel
          sx={{
            color: 'text.primary',
            fontSize: 14,
            fontWeight: 500,
            mb: 0.5,
            position: 'relative',
            transform: 'none',
          }}
        >
          {t('print.Size')}
        </InputLabel>
        <Select
          fullWidth
          value={printFormat}
          onChange={handleFormatChange}
          size="small"
        >
          <MenuItem value={'a4'}>A4</MenuItem>
          <MenuItem value={'a6'}>A6</MenuItem>
        </Select>
      </Container> */}
    </Dialog>
  )
}

// PackagePrintModal.propTypes = {
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       order_id: PropTypes.string.isRequired,
//       tracking_code: PropTypes.string.isRequired,
//       tracking_partner_company: PropTypes.string,
//       name: PropTypes.string,
//       client_first_name: PropTypes.string.isRequired,
//       client_last_name: PropTypes.string.isRequired,
//       client_phone: PropTypes.string.isRequired,
//       address: PropTypes.string.isRequired,
//       total_price: PropTypes.number.isRequired,
//       package_type: PropTypes.string.isRequired,
//       can_be_opened: PropTypes.number,
//       created_at: PropTypes.string.isRequired,
//     }).isRequired,
//   ),
// }

export default VoucherPrintModal
