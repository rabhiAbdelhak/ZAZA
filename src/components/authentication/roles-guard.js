import PropTypes from 'prop-types'
import { useAuth } from '../../providers/AuthProvider'
import * as React from 'react'
import { useRouter } from 'next/router'

const SplashScreen = () => null

export const RolesGuard = ({
  children,
  authorizedRoles = [],
  redirection = false,
}) => {
  const router = useRouter()
  const { user } = useAuth()
  const [checked, setChecked] = React.useState(false)

  const hasAutorization = authorizedRoles.includes(user?.roles)

  React.useEffect(() => {
    // if user is still init do nothing
    if (!router.isReady) {
      return
    }

    // redirect to login if user not logged in and try to access secured pages
    if (!hasAutorization && redirection) {
      router.push({ pathname: `/dashboard/orders` })
    } else {
      setChecked(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, hasAutorization])

  if (!checked) {
    return <SplashScreen />
  }

  if (!hasAutorization) {
    return null
  }

  return <>{children}</>
}

RolesGuard.propTypes = {
  children: PropTypes.node,
  authorizedRoles: PropTypes.arrayOf(PropTypes.string),
  redirection: PropTypes.bool,
}
