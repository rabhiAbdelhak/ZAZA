import {
  Avatar,
  Box,
  InputAdornment,
  MenuItem,
  Popover,
  Typography,
  IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { useEmployeesQuery } from '../queries/employee'
import { InputField } from './input-field'
import { Search } from '@mui/icons-material'
import { useAssignOrderMutation } from '@/queries/order'
import { generateAvatar } from '../utils/randomized-avatar'
import toast from 'react-hot-toast'
import { X } from '@/icons/x'

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
const AssignToUserPopper = ({
  open,
  anchorEl,
  handleClose,
  order,
  handleAssign,
  handleUnAssign,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useEmployeesQuery()
  const [employees, setEmployees] = useState([])
  const [term, setTerm] = useState('')
  const mutation = useAssignOrderMutation()

  useEffect(() => {
    if (data) {
      setEmployees((prevEmps) => {
        return data.filter((emp) =>
          emp.name.toUpperCase().includes(term.toUpperCase()),
        )
      })
    }
  }, [data, term])
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
          onChange={(e) => setTerm(e.target.value)}
          className={classes.commentInput}
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
          }}
        />
      </Box>
      <Box sx={{ height: '300px', overflowY: 'auto' }}>
        {employees.map((emp) => {
          const assignedUsers = order.assigned_users.map((em) => em.id)
          const assigned = Boolean(assignedUsers.includes(emp.id))
          return (
            <MenuItem
              key={emp?.id}
              sx={{
                display: 'flex',
                alinItems: 'center',
                gap: 1,
                p: 2,
                '&:hover .close': { display: 'flex' },
              }}
              onClick={() => {
                const emps = assigned
                  ? assignedUsers.filter((id) => id !== emp?.id)
                  : [...assignedUsers, emp.id]
                if (!assigned) {
                  setTerm('')
                  handleClose()
                }
                if (assigned) {
                  handleUnAssign([emp.id], order.id)
                } else {
                  handleAssign([emp.id], order.id)
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {emp.avatar.includes('placeholder') ? (
                  generateAvatar(emp.name, 40, assigned)
                ) : (
                  <Avatar
                    src={emp.avatar}
                    sx={{
                      border: assigned ? 'solid 3px' : 'none',
                      borderColor: 'info.main',
                    }}
                  />
                )}
                {assigned && (
                  <IconButton
                    className="close"
                    component={Box}
                    color="error"
                    sx={{
                      bgcolor: 'error.main',
                      display: 'none',
                      minHeight: 0,
                      minWidth: 0,
                      p: '1px',
                      position: 'absolute',
                      bottom: '-5px',
                      right: '-5px',
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: 'white',
                      '&:hover': { bgcolor: 'info.main' },
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnAssign([emp.id], order.id)
                    }}
                  >
                    <X sx={{ fontSize: '12px', color: 'white' }} />
                  </IconButton>
                )}
              </Box>
              <Typography color="secondary.main">{emp.name}</Typography>
            </MenuItem>
          )
        })}
      </Box>
    </Popover>
  )
}

export default AssignToUserPopper
