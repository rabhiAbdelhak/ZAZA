import { CheckCircleOutline, InfoRounded } from '@mui/icons-material'
import { Dialog, DialogContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { closeStatusDrawer } from '../contexts/global context/actions/component-actions'
import {
  useGlobaleDispatchContext,
  useGlobaleStateContext,
} from '../contexts/global context/Provider'

const StatusDialogDrawer = () => {
  const {
    componentState: {
      statusDrawerState: { open, message, type },
    },
  } = useGlobaleStateContext()
  const { componentDispatch: dispatch } = useGlobaleDispatchContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeStatusDrawer()(dispatch)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [open, dispatch])
  return (
    <Dialog open={open} onClose={() => closeStatusDrawer()(dispatch)}>
      <DialogContent
        sx={{
          padding: '30px 70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {type === 'success' ? (
          <CheckCircleOutline sx={{ color: 'success.main' }} />
        ) : type === 'error' ? (
          <InfoRounded sx={{ color: 'error.main' }} />
        ) : null}
        <Typography variant="h5" color="text.primary">
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default StatusDialogDrawer
