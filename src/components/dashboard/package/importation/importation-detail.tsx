import TableLoading from '@/components/table-loading'
import { usePackagesImportationDetailQuery } from '@/queries/importation'
import {
  Container,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import EventIcon from '@mui/icons-material/Event'
import TagIcon from '@mui/icons-material/Tag'
import { format } from 'date-fns'
import { Scrollbar } from '@/components/scrollbar'
import { StatusBadge } from '@/components/status-badge'
import {
  paymentStatusVariants,
  situationsVariant,
  statusVariants,
} from '@/constants/pacakges-statuses'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import { ResourceError } from '@/components/resource-error'
const columns = [
  'Tracking code',
  'Status',
  'Product',
  'Customer',
  'Phone Number',
  'State',
  'Delivery Type',
  'Payment Status',
]

type ImportationDetailProps = {
  importationId?: number
}

export default function ImportationDetail({
  importationId,
}: ImportationDetailProps) {
  const { data, isLoading, isSuccess, error } =
    usePackagesImportationDetailQuery(importationId)
  const { t } = useTranslation()

  const displayUnavailable = Boolean(!isLoading && !error && !data)
  const displayError = Boolean(!isLoading && error)

  return (
    <Container maxWidth={false}>
      <Typography color="textPrimary" variant="h4">
        {t('Importation.details')}
      </Typography>
      {isLoading && <Skeleton width={200} />}
      {isSuccess && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            display="flex"
            gap={1 / 2}
            alignItems="center"
            sx={{ color: 'text.secondary' }}
          >
            <EventIcon sx={{ fontSize: 18 }} color="inherit" />
            <Typography color="inherit" variant="body2">
              {data?.created_at
                ? format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')
                : ''}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap={1 / 2}
            alignItems="center"
            sx={{ color: 'text.secondary' }}
          >
            <TagIcon sx={{ fontSize: 18 }} color="inherit" />
            <Typography color="inherit" variant="body2">
              {data?.id}
            </Typography>
          </Box>
        </Box>
      )}
      <Scrollbar>
        <Table sx={{ width: '100%', mt: 3 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{t(`Attributes.${column}`)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.packages?.map((pack) => {
              const situationVariant = situationsVariant.find((situation) => {
                return Array.from(situation.statusIds).includes(pack.status_id)
              })
              const statusVariant = statusVariants.find(
                (status) => status.id === pack.status_id,
              )
              const paymentStatus = paymentStatusVariants.find((status) => {
                return Boolean(
                  status.name.fr === pack.store_payment_status_name,
                )
              })
              return (
                <TableRow key={pack.id}>
                  <TableCell>{pack.tracking_code}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <StatusBadge color={situationVariant?.color || 'red'} />
                      <Typography
                        noWrap
                        variant="inherit"
                        color={situationVariant?.color}
                      >
                        {statusVariant && t(statusVariant.name.en)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '220px' }} title={pack?.name}>
                    <Typography noWrap color="inherit" variant="inherit">
                      {`${pack.name}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    title={pack.client_first_name}
                    sx={{ maxWidth: '220px' }}
                  >
                    <Typography noWrap variant="inherit">
                      {pack.client_first_name}
                    </Typography>
                  </TableCell>
                  <TableCell>{`${pack.client_phone}`}</TableCell>
                  <TableCell>
                    <Typography noWrap color="inherit" variant="inherit">
                      {pack?.commune?.name
                        ? `${pack?.commune?.name} - ${pack?.commune?.wilaya?.name}`
                        : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>{pack?.delivery_type}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StatusBadge color={paymentStatus?.color ?? 'red'} />
                      <Typography
                        noWrap
                        variant="inherit"
                        color={paymentStatus?.color}
                      >
                        {paymentStatus && t(paymentStatus?.name?.en)}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>

      {isLoading && <TableLoading />}

      {displayError && (
        <ResourceError error={String(error)} sx={{ flexGrow: 1, m: 2 }} />
      )}

      {displayUnavailable && <ResourceUnavailable sx={{ flexGrow: 1, m: 2 }} />}
    </Container>
  )
}
