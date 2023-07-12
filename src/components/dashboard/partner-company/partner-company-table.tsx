import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import {
  Box,
  Card,
  Chip,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import TableLoading from '@/components/table-loading'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { useTranslation } from 'react-i18next'
import DeletePartnerCompanyDialog from './delete-partner-company-dialog'

type PartnerCompanyTableProps = {
  selectedPartnerCompany?: PartnerCompany
  onSelectPartnerCompany?: (partnerCompany: PartnerCompany) => void
  data?: PartnerCompany[]
  compact?: boolean
  isLoading?: boolean
  error?: any
}

function PartnerCompanyTable({
  data = [],
  selectedPartnerCompany,
  compact = false,
  isLoading = false,
  error,
  onSelectPartnerCompany,
}: PartnerCompanyTableProps) {
  const anchorClickHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const [selectedItem, setSelectedItem] = useState<PartnerCompany>()
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const { t } = useTranslation()

  const onRemove =
    (item: PartnerCompany) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setSelectedItem(item)
      setOpen(true)
    }

  const displayLoading = isLoading
  const displayError = Boolean(!isLoading && error)
  const displayUnavailable = Boolean(!isLoading && !error && !data.length)
  const displayData = Boolean(!isLoading && !error && data.length)

  return (
    <Card>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Name')}</TableCell>
            {!compact && <TableCell>{t('Email')}</TableCell>}
            {!compact && <TableCell>{t('Phone')}</TableCell>}
            <TableCell>{t('Store')}</TableCell>
            {!compact && <TableCell align="right" />}
          </TableRow>
        </TableHead>
        {displayData && (
          <TableBody>
            {data.map((partnerCompany) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                selected={selectedPartnerCompany?.id === partnerCompany.id}
                key={partnerCompany.id}
                onClick={() =>
                  onSelectPartnerCompany &&
                  onSelectPartnerCompany(partnerCompany)
                }
                hover
              >
                <TableCell sx={{ py: 0 }}>
                  <Box display="flex" gap={1} alignItems="center">
                    <Typography fontSize="inherit" noWrap color="inherit">
                      {partnerCompany.name}
                    </Typography>
                  </Box>
                </TableCell>
                {!compact && (
                  <TableCell sx={{ py: 0 }}>
                    <Link
                      target="_blank"
                      href={partnerCompany.email}
                      noWrap
                      color="inherit"
                      fontSize="inherit"
                      underline="hover"
                      onClick={anchorClickHandler}
                    >
                      {partnerCompany?.user?.email}
                    </Link>
                  </TableCell>
                )}
                {!compact && (
                  <TableCell>
                    <Typography noWrap variant="inherit">
                      <Chip
                        component={Link}
                        href={`tel:${partnerCompany?.phone}`}
                        size="small"
                        icon={<LocalPhoneIcon sx={{ fontSize: 18 }} />}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ color: 'text.primary' }}
                        label={partnerCompany?.phone}
                      />
                    </Typography>
                  </TableCell>
                )}
                <TableCell>{partnerCompany?.store?.name}</TableCell>

                {!compact && (
                  <TableCell sx={{ py: 0 }} align="right">
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={onRemove(partnerCompany)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {displayLoading && <TableLoading />}
      {displayError && <ResourceError error={error} sx={{ flexGrow: 1 }} />}
      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1 }} />}

      <DeletePartnerCompanyDialog
        open={open}
        partnerCompany={selectedItem}
        onClose={handleClose}
        onSuccess={handleClose}
      />
    </Card>
  )
}

export default PartnerCompanyTable
