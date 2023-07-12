import { usePopover } from '@/hooks/use-popover'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Button, ButtonProps, Paper, Popover, Popper } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { InputField } from '@/components/input-field'

type Dates = {
  from: string
  to: string
}

type TableDateFilterButtonProps = {
  filter?: Dates
  onFilter: (newFilter: Dates) => void
  label: string
} & ButtonProps

function TableDateFilterButton({
  filter,
  onFilter,
  label,
  ...buttonProps
}: TableDateFilterButtonProps) {
  const [anchorRef, open, handleOpen, handleClose] = usePopover()
  const { from = '', to = '' } = filter || {}

  const { t } = useTranslation()
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        endIcon={<KeyboardArrowDown />}
        {...buttonProps}
        ref={anchorRef}
        onClick={handleOpen}
      >
        {label}
      </Button>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        open={open}
        onClose={handleClose}
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
            onChange={(e: any) => onFilter({ from: e.target.value || '', to })}
            placeholder="From"
            value={from}
          />
          <InputField
            type="date"
            label={t('Attributes.To')}
            name="created_to"
            value={to}
            onChange={(e: any) => onFilter({ from, to: e.target.value || '' })}
            inputProps={{ min: from || undefined }}
          />
        </Paper>
      </Popover>
    </>
  )
}

export default TableDateFilterButton
