import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import PartnerCompanyPricingTypes from './partner-company-pricing-types'

type CompProps = {
  open: boolean
  onClose: () => void
  partnerCompany: PartnerCompany
}

const PartnerCompanypricingModal = (props: CompProps) => {
  const { open, onClose, partnerCompany } = props
  const { t } = useTranslation()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      PaperProps={{
        sx: {
          width: '100%',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" color="textPrimary">
          {t('Company pricing ')}({partnerCompany.name})
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '700px' }}>
        <PartnerCompanyPricingTypes partnerCompanyId={partnerCompany?.id} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PartnerCompanypricingModal
