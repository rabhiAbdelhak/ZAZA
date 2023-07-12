import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import TableLoading from '@/components/table-loading'
import { usePackagesImportationDetailQuery } from '@/queries/importation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PDFViewer } from '@react-pdf/renderer'
import PDFPackage from '../PDFPackage'
import { useAuth } from '@/providers/AuthProvider'
import { X as CloseIcon } from '@/icons/x'
import {
  AppBar,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'

type ImportationDetailProps = {
  importationId?: number
  onClose?: () => void
}

export default function ImportationPrint({
  importationId,
  onClose,
}: ImportationDetailProps) {
  const { data, isLoading, isSuccess, error } =
    usePackagesImportationDetailQuery(importationId)
  const { t } = useTranslation()

  const [printFormat, setPrintFormat] = useState('a4')
  const isA6Format = printFormat === 'a6'
  const { user } = useAuth()

  const handleFormatChange = (event: any) => {
    setPrintFormat(event.target.value)
  }

  return (
    <>
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
      {isLoading && <TableLoading />}
      {error && (
        <ResourceError error={String(error)} sx={{ flexGrow: 1, m: 2 }} />
      )}
      {isSuccess && !data && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}

      {isSuccess && data && (
        <>
          <PDFViewer style={{ height: 'calc(100vh - 96px)', width: '100%' }}>
            <PDFPackage
              user={user}
              data={data?.packages || []}
              isA6Format={isA6Format}
            />
          </PDFViewer>
          <Container maxWidth="xs" sx={{ py: 2 }}>
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
          </Container>
        </>
      )}
    </>
  )
}
