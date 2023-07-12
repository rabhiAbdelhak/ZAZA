import { usePopover } from '@/hooks/use-popover'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Button, ButtonProps, Paper, Popover, Popper } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { InputField } from '@/components/input-field'
import { MouseEvent, useState } from 'react'
import { format } from 'date-fns'

type Dates = { startDate: string; endDate: string }
type PickDateFilterButtonProps = Omit<ButtonProps, 'onClick' | 'children'> & {
  value?: Dates
  onChange: (dates: Dates) => void
  label?: string
}

const PickDateFilterButton = (props: PickDateFilterButtonProps) => {
  const {
    value = { startDate: '', endDate: '' },
    onChange,
    label = 'Pick a date',
    ...buttonProps
  } = props
  const [anchor, setAnchor] = useState<HTMLButtonElement>()
  const [open, setOpen] = useState(false)

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
    setOpen(true)
  }

  const onClose = () => setOpen(false)

  const { t } = useTranslation()

  const getDateText = () => {
    const start = value.startDate
      ? format(new Date(value.startDate), 'dd/MM/yyyy')
      : ''
    const end = value.endDate
      ? format(new Date(value.endDate), 'dd/MM/yyyy')
      : ''

    if (start && end) {
      return start + ' - ' + end
    }

    if (start) {
      return start
    }

    if (end) {
      return end
    }

    return label
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        endIcon={<KeyboardArrowDown />}
        {...buttonProps}
        onClick={onOpen}
      >
        {getDateText()}
      </Button>
      <Popover
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        open={open}
        onClose={onClose}
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
              onChange({
                startDate: e.target.value,
                endDate: value.endDate,
              })
            }}
            placeholder="From"
            name="created_from"
            value={value?.startDate}
          />
          <InputField
            type="date"
            label={t('Attributes.To')}
            name="created_to"
            value={value?.endDate}
            onChange={(e: any) => {
              onChange({
                startDate: value.startDate,
                endDate: e.target.value,
              })
            }}
          />
        </Paper>
      </Popover>
    </>
  )
}

export default PickDateFilterButton
