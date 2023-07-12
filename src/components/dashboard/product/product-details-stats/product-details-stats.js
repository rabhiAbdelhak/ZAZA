import { Box } from '@mui/material'
import { Cube as CubeIcon } from '../../../../icons/cube'
import { CheckCircle as CheckCircleIcon } from '../../../../icons/check-circle'
import { XCircle as XCircleIcon } from '../../../../icons/x-circle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PropTypes from 'prop-types'
import StatsCard from '../../../stats-card'
import { useTranslation } from 'react-i18next'

function ProductDetailsStats({
  autoResize = 200,
  gap = 2,
  qtyInDeposit = 0,
  qtyInConfirmation = 0,
  qtyInDelivery = 0,
  qtyDamaged = 0,
}) {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${autoResize}px, 100%), 1fr))`,
        display: 'grid',
        gap,
      }}
    >
      <StatsCard
        icon={CubeIcon}
        color="#506176"
        title={t('products.QtyInDeposit')}
        subTitle={qtyInDeposit}
      />
      <StatsCard
        icon={CheckCircleIcon}
        color="#27AB6E"
        title={t('products.QtyInConfirmation')}
        subTitle={qtyInConfirmation}
      />
      <StatsCard
        icon={LocalShippingIcon}
        color="#1070CA"
        title={t('products.QtyInDelivery')}
        subTitle={qtyInDelivery}
      />
      <StatsCard
        icon={XCircleIcon}
        color="#EC4C47"
        title={t('products.QtyDamaged')}
        subTitle={qtyDamaged}
      />
    </Box>
  )
}

ProductDetailsStats.propTypes = {
  autoResize: PropTypes.number,
  gap: PropTypes.number,
  qtyInDeposit: PropTypes.number,
  qtyInConfirmation: PropTypes.number,
  qtyInDelivery: PropTypes.number,
  qtyDamaged: PropTypes.number,
}

export default ProductDetailsStats
