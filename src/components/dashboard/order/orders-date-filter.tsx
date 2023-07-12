import { usePopover } from '@/hooks/use-popover'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Button, Paper, Popover, Popper } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

//local imports
import { DateField } from '../../date-field'
import { InputField } from '@/components/input-field'

type CompProps = {
  filter: any
  onFiltersApply: (newFilter: any) => void
}
const OrderDateFilter = (props: CompProps) => {
  const { filter, onFiltersApply } = props
  const [anchorRef, open, handleOpen, handleClose] = usePopover()

  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      created_from: filter?.created_from,
      created_to: filter?.created_to,
    },
    onSubmit: (values) => {
      console.log('submitting')
    },
  })
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        ref={anchorRef}
        endIcon={<KeyboardArrowDown />}
        onClick={handleOpen}
      >
        {t('Creation')}
      </Button>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
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
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            boxShadow: 10,
            minWidth: 250,
          }}
        >
          <InputField
            type="date"
            label={t('Attributes.From')}
            onChange={(e: any) => {
              onFiltersApply({
                ...filter,
                created_from: e.target.value,
              })
            }}
            placeholder="From"
            name="created_from"
            value={filter?.created_from}
          />
          <InputField
            type="date"
            label={t('Attributes.To')}
            name="created_to"
            value={filter?.created_to}
            onChange={(e: any) =>
              onFiltersApply({ ...filter, created_to: e.target.value })
            }
          />
        </Paper>
      </Popover>
    </>
  )
}

export default OrderDateFilter
