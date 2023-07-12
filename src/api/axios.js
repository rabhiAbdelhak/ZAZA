import axios from 'axios'
import { getTokenStorage, removeTokenStorage } from '../providers/AuthProvider'

export const dropshipFetch = axios.create({
  baseURL: 'https://erp.zimou.dev/api/v1',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'en-US,en;',
  },
})
export const dropshipFetchTEST = axios.create({
  baseURL: 'https://localhost:3050',

  headers: {
    Accept: 'application/json',
  },
})
//'https://api-manager.zimou.dev/api/v1',

// intrecpet request and attch a token to the header
dropshipFetch.interceptors.request.use(
  (config) => {
    const token = getTokenStorage()
    config.headers.authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

dropshipFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    // logout user if reponse is 401 and refresh browser
    if (error?.response?.status === 401) {
      removeTokenStorage()
      globalThis?.window?.location?.assign(
        globalThis?.window?.location?.toString(),
      )
    }
    return Promise.reject(error)
  },
)
