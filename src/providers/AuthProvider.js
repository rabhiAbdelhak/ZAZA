import * as React from 'react'
import * as authApi from '../api/auth'
import { useAsync } from '../hooks/useAsync'
import * as profileAPI from '../api/profile'

const AuthContext = React.createContext()

export const getTokenStorage = () => window?.localStorage?.getItem('auth-token')
export const removeTokenStorage = () =>
  window?.localStorage?.removeItem('auth-token')
export const setTokenStorage = (token) =>
  globalThis.window?.localStorage?.setItem('auth-token', token)

function AuthProvider(props) {
  const [isLoading, setIsloading] = React.useState(true)
  const [profileDataExpr, setProfileDataExpr] = React.useState({})
  const {
    data: user,
    isLoading: isInit,
    run,
    setData,
  } = useAsync({ status: 'pending' })

  const isConnected = Boolean(user)
  //const isConnectedExpress = Boolean(profileDataExpr)

  // fetch user profile if the user already logged in
  React.useEffect(() => {
    const token = getTokenStorage()
    if (token) {
      run(profileAPI.getProfile()).catch((err) => console.log(err))
      return
    }
    setData(null)
  }, [run, setData])

  const login = React.useCallback(
    async (email, password) => {
      const accessToken = await authApi.login({ email, password })
      setTokenStorage(accessToken)
      const data = await profileAPI.getProfile()
      setData(data)
    },
    [setData],
  )

  const loginWithToken = React.useCallback(
    async (token) => {
      const accessToken = await authApi.loginWithToken({ token })
      setTokenStorage(accessToken)
      const data = await profileAPI.getProfile()

      setData(data)
    },
    [setData],
  )

  const logout = React.useCallback(async () => {
    removeTokenStorage()
    setData(null)
  }, [setData])

  const updateUser = React.useCallback(
    async (data) => {
      const { avatar, commune, ...otherData } = data
      await profileAPI.uploadAvatar(avatar)
      const newUserData = await profileAPI.updateProfile({
        ...otherData,
        commune_id: commune.id,
      })
      setData(newUserData)
    },
    [setData],
  )

  const value = React.useMemo(
    () => ({
      user,
      isInit,
      isConnected,
      logout,
      login,
      updateUser,
      loginWithToken,
    }),
    [isConnected, isInit, login, logout, updateUser, loginWithToken, user],
  )

  return <AuthContext.Provider {...props} value={value} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { AuthProvider as default, useAuth }
