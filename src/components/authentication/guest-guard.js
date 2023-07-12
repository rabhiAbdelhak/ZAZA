import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth } from '../../providers/AuthProvider'
import { Snackbar } from '@mui/material'
export const GuestGuard = (props) => {
  const { children } = props
  const { isConnected, isInit } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!router.isReady || isInit) {
      return
    }
    if (isConnected) {
      router.push('/dashboard/orders').catch(console.error)
    } else {
      setChecked(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit, router, router.isReady])

  if (!checked || isInit) {
    return null
  }

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node,
}
