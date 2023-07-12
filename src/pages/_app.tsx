import 'simplebar/dist/simplebar.min.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'
import nProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  SettingsConsumer,
  SettingsProvider,
} from '../contexts/settings-context'
import { RTL } from '../components/rtl'
import { gtm } from '../lib/gtm'
import { gtmConfig } from '../config'
import { createTheme } from '../theme'
import { createEmotionCache } from '../utils/create-emotion-cache'
import '../i18n'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { GlobalContextProvider } from '../contexts/global context/Provider'
import AlertDialog from '../components/alert-dialog'
import StatusDialogDrawer from '../components/status-dialog-drawer'
import AuthProvider from '../providers/AuthProvider'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { EmotionCache } from '@emotion/cache'
import type { ReactElement, ReactNode } from 'react'
import '../styles/app.css'
Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

const SplashScreen = () => null

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type EnhancedAppProps = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

const App = (props: EnhancedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])
  return (
    <>
      <Head>
        <title>ZimouExpress</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AuthProvider>
                <SettingsProvider>
                  <SettingsConsumer>
                    {({ settings }) => (
                      <ThemeProvider
                        theme={createTheme({
                          direction: settings.direction,
                          mode: settings.theme,
                        })}
                      >
                        <RTL direction={settings.direction}>
                          <CssBaseline />
                          <GlobalContextProvider>
                            {getLayout(<Component {...pageProps} />)}
                            <AlertDialog />
                            <StatusDialogDrawer />
                          </GlobalContextProvider>
                          <Toaster position="top-center" />
                        </RTL>
                      </ThemeProvider>
                    )}
                  </SettingsConsumer>
                </SettingsProvider>
              </AuthProvider>
            </LocalizationProvider>
          </CacheProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
