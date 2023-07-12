import { usePopover } from '@/hooks/use-popover'
import { PersonAddAltOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import AssignToUserPopper from './assign-to-user-popper'

const AddUserButton = (props) => {
  const { order, handleAssign, disabled } = props
  const [anchorRef, open, handleOpen, handleClose] = usePopover()

  return (
    <>
      <Box
        ref={anchorRef}
        sx={{
          height: '30px',
          width: '30px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dashed',
          borderColor: 'neutral.400',
          cursor: disabled ? 'not-allowed' : 'pointer',
          p: 1,
          transition: '250ms',
          zIndex: 9,

          ml: '-10px',
          '&:hover': !disabled
            ? {
                transform: 'scale(1.1)',
                zIndex: 1000,
                borderColor: 'primary.main',
              }
            : null,
          '&:hover .icon': !disabled ? { color: 'primary.main' } : null,
        }}
        onClick={disabled ? null : handleOpen}
      >
        <PersonAddAltOutlined
          className="icon"
          sx={{ fontSize: '20px', color: 'neutral.500' }}
        />
      </Box>
      <AssignToUserPopper
        anchorEl={anchorRef.current}
        open={open}
        handleClose={handleClose}
        order={order}
        handleAssign={handleAssign}
      />
    </>
  )
}

export default AddUserButton
