import {
  Avatar,
  Box,
  InputAdornment,
  MenuItem,
  Popover,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { InputField } from '@/components/input-field'
import { Search } from '@mui/icons-material'
import { useAssignOrderMutation } from '@/queries/order'

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
  users: any
  handleClose: () => any
  onApplyFilters: (newFilter: any) => void
}

const OrderUserFilterPopper = (props: CompProps) => {
  const { open, anchorEl, handleClose, users, onApplyFilters } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [employees, setEmployees] = useState(users)
  const [term, setTerm] = useState('')
  const mutation = useAssignOrderMutation()

  useEffect(() => {
    if (users) {
      setEmployees((prevEmps: any) => {
        return users.filter((emp: any) =>
          emp.name.toUpperCase().includes(term.toUpperCase()),
        )
      })
    }
  }, [users, term])
  return (
    <Popover
      anchorEl={anchorEl}
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
      <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <InputField
          fullWidth
          type="text"
          placeholder={t('Search')}
          onChange={(e: any) => setTerm(e.target?.value)}
          InputProps={{
            sx: {
              border: 'none !important',
              height: 45,
              padding: '10px !important',
              boxShadow: 'none !important',
            },
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            disableUnderline: true,
            className: classes.TermInput,
          }}
        />
      </Box>
      <Box sx={{ height: '300px', overflowY: 'auto', pt: 2 }}>
        <FormGroup>
          {employees.map((emp: any) => {
            return (
              <FormControlLabel
                key={emp.id}
                sx={{
                  p: 1,
                  borderLeft: '17px solid transparent',
                  '&:hover': {
                    bgcolor: 'neutral.100',
                    borderColor: 'primary.main',
                  },
                }}
                control={<Checkbox />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      src={emp.avatar}
                      sx={{ height: '30px', width: '30px' }}
                    />
                    <Typography>{emp.name}</Typography>
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

export default OrderUserFilterPopper
