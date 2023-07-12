import { Box, Card, Grid, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

//local imports
import { useDetailsSliding } from '@/hooks/use--details-sliding'
import { usePackageDetailQuery } from '@/queries/package'
import LoadingDetailsComponent from '../../loading-details-component'
import { Event, Tag } from '@mui/icons-material'
import PackageCustomerInfo from './package-customer-info'
import PackageOrderInfo from './package-order-info'
import PackageDeliveryInfo from './package-delivery-info'
import PackageHistory from './package-history'
import InternalDrawerListToolbar, {
  InternalDrawerToolbarProps,
} from '@/components/InternalDrawerListToolbar'
import InternalDrawer, {
  InternalDrawerProps,
} from '@/components/InternalDrawer'
import { BoxProps } from '@mui/system'

type CompProps = {
  anchorLeft: any
  open?: boolean
  onClose: () => void
  packid: number
  packages: any[]
  onSelectSinglePackage: (id: number) => void
  sx: BoxProps['sx']
}

type PackageDrawerProps = InternalDrawerProps &
  InternalDrawerToolbarProps &
  CompProps

const PackageSideDrawer = (props: PackageDrawerProps) => {
  //const {left, top} = anchorLeft.getClientBoundaries()
  const {
    onClose,
    open,
    packid = 355,
    packages = [],
    sx,
    onSelectSinglePackage,
  } = props
  const packagesIds = packages.map((pack: any) => pack.id)
  const [selectedId, handleNext, handlePrevious] = useDetailsSliding(
    packagesIds,
    packid,
  )

  const {
    data: pack,
    isLoading,
    isError,
    error,
  } = usePackageDetailQuery(packid, { enabled: Boolean(packid) }) as any
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    onSelectSinglePackage(selectedId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDetailsComponent />
    }

    if (pack) {
      return (
        <Grid container spacing={4}>
          {/* <Grid item md={12}>
            <OrderStatusInfo order={order} />
          </Grid> */}
          <Grid item md={6}>
            <PackageCustomerInfo pack={pack} />
          </Grid>
          <Grid item md={6}>
            <PackageOrderInfo pack={pack} />
          </Grid>
          <Grid item md={12}>
            <PackageDeliveryInfo pack={pack} />
          </Grid>
          <Grid item md={12}>
            <PackageHistory packid={pack.id} />
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <InternalDrawer open={open} sx={sx}>
      <InternalDrawerListToolbar
        onNext={handleNext}
        onPrev={handlePrevious}
        disabled={isLoading}
        onClose={onClose}
      />
      <Card
        sx={{
          height: 'calc(100% - 100px)',
          p: 2,
          border: 'none',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4">
              {t('packages.Package Details')}
            </Typography>
            {pack && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Event sx={{ color: 'text.secondary', width: '22px' }} />
                {isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  <Typography variant="caption" color="textSecondary" mr={2}>
                    {format(new Date(pack?.created_at), 'dd-mm-yyyy hh:mm')}
                  </Typography>
                )}
                <Tag sx={{ color: 'text.secondary', width: '22px' }} />
                {isLoading ? (
                  <Skeleton variant="text" width={50} />
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    {pack.tracking_code}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
        {renderContent()}
      </Card>
    </InternalDrawer>
  )
}

export default PackageSideDrawer
