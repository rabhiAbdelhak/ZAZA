import {
  Box,
  Popover,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { SyntheticEvent } from 'react'

const useStyles = makeStyles({
  TermInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      padding: 0,
      textAlign: 'center !important',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
  },
})

type CompProps = {
  open: boolean
  anchorEl: any
  statusList: any
  handleClose: () => any
  filter: any
  onApplyFilters: (newFilter: any) => void
}

const OrderStatusesFilterPopper = (props: CompProps) => {
  const { filter, open, anchorEl, handleClose, statusList, onApplyFilters } =
    props
  const { t } = useTranslation()
  const handleChangeChecking = (id: number) => {
    if (filter.statuses.includes(id)) {
      onApplyFilters({
        ...filter,
        statuses: filter.statuses.filter((stid: number) => stid !== id),
      })
    } else {
      onApplyFilters({ ...filter, statuses: [...filter.statuses, id] })
    }
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      disableRestoreFocus={true}
      open={open}
      onClose={handleClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ height: '300px', overflowY: 'auto', pt: 2 }}>
        <FormGroup>
          {statusList.map((status: any) => {
            return (
              <FormControlLabel
                key={status.name}
                onChange={() => handleChangeChecking(status.id)}
                sx={{
                  p: 1,
                  borderLeft: '17px solid transparent',
                  '&:hover': {
                    bgcolor: 'neutral.100',
                    borderColor: status.color,
                  },
                }}
                control={
                  <Checkbox
                    color={status.color.split('.')[0]}
                    checked={Boolean(filter.statuses.includes(status.id))}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" color={status.color}>
                      {t(status.name)}
                    </Typography>
                  </Box>
                }
              />
            )
          })}
        </FormGroup>
      </Box>
    </Popover>
  )
}

export default OrderStatusesFilterPopper
