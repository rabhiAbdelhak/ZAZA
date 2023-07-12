import { CheckCircle } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { X as XIcon } from '../../../icons/x'
import { useEmployeesQuery } from '../../../queries/employee'
import { useAssignOrderMutation } from '../../../queries/order'
import { Scrollbar } from '../../scrollbar'
import TableLoading from '../table-loading'

const AssignToUserDialog = (props) => {
  const { open, onClose, selectedOrders, orderid, assignedTo, clearSelected } =
    props
  const [selectedEmpId, setSelectedEmpId] = useState(assignedTo)
  const { data: employees, isLoading, isError, error } = useEmployeesQuery()
  const { t } = useTranslation()
  const mutation = useAssignOrderMutation()

  const handleAssign = () => {
    const selectedIds = orderid ? [orderid] : [...selectedOrders]
    if (!selectedEmpId || !selectedIds.length)
      return toast.warning(t('toast.SelectEmp'))

    const result = toast.promise(
      mutation.mutateAsync({
        order_ids: selectedIds,
        assigned_users: [selectedEmpId],
      }),
      {
        loading: t('toast.Saving'),
        success: () => {
          return t('toast.SavedSuccessfully')
        },
        error: (err) => {
          return err?.response?.data?.message
        },
      },
    )
    onClose()
    return result
  }

  const renderContent = () => {
    if (isLoading) {
      return <TableLoading />
    }
    return (
      <Scrollbar>
        <List sx={{ maxHeight: 400 }}>
          {employees?.map((employee) => {
            return (
              <ListItem
                key={employee.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: '500ms',
                  '&:hover': {
                    bgcolor: 'neutral.50',
                  },
                }}
                onClick={() => setSelectedEmpId(employee.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={employee.avatar} />
                  <Typography>{employee.name}</Typography>
                </Box>
                {selectedEmpId && selectedEmpId === employee.id && (
                  <CheckCircle color="primary" sx={{ fontSize: '17px' }} />
                )}
              </ListItem>
            )
          })}
        </List>
      </Scrollbar>
    )
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: 500,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Typography color="textPrimary" variant="inherit">
          {t('orders.Assign to User')}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        <Button
          disabled={isLoading || !selectedEmpId}
          variant="contained"
          sx={{ color: 'primary.contrast' }}
          onClick={handleAssign}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AssignToUserDialog
