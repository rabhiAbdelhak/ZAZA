import PropTypes from 'prop-types'
import { useAuth } from '../../providers/AuthProvider'
import * as React from 'react'
import { useRouter } from 'next/router'

const SplashScreen = () => null

export const AuthGuard = ({ children }) => {
  const router = useRouter()
  const { isConnected, isInit } = useAuth()
  const [checked, setChecked] = React.useState(false)

  const { loginWithToken } = useAuth()
  const accessToken = router.query.token

  async function loginWithTokenFunc(token) {
    return loginWithToken(token)
      .then(() => {
        const returnUrl = '/dashboard/orders/'
        router.push(returnUrl).catch(console.error)
      })
      .catch((err) => {
        router.push({
          pathname: `/authentication/login`,
          query: {
            returnUrl: router.asPath,
            error:
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message,
          },
        })
      })
  }
  React.useEffect(() => {
    // if user is still init do nothing
    if (isInit || !router.isReady) {
      return
    }

    if (!isConnected) {
      if (accessToken) {
        loginWithTokenFunc(accessToken)
      } else {
        router.push({
          pathname: `/authentication/login`,
          query: { returnUrl: router.asPath },
        })
      }
    } else {
      setChecked(true)
    }
    // redirect to login if user not logged in and try to access secured pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isInit])

  if (isInit || !checked) {
    return <SplashScreen />
  }

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
