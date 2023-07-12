import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import useOfflineToaster from '../hooks/useOfflineToaster'

const initialSettings = {
  direction: 'ltr',
  language: 'en',
  pinSidebar: true,
  theme: 'light',
}

export const restoreSettings = () => {
  let settings = null
  try {
    const storedData = window.localStorage.getItem('settings')

    if (storedData) {
      settings = JSON.parse(storedData)
    } else {
      settings = {
        direction: 'ltr',
        language: 'en',
        pinSidebar: false,
        //  commonent this line to fix dark theme issue
        // theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
        theme: 'light',
      }
    }
  } catch (err) {
    console.error(err)
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings
}

export const storeSettings = (settings) => {
  window.localStorage.setItem('settings', JSON.stringify(settings))
}

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: () => {},
})

export const SettingsProvider = (props) => {
  const { children } = props
  const [settings, setSettings] = useState(initialSettings)
  const { i18n } = useTranslation()
  useOfflineToaster() // this is to show a toaster when offline

  useEffect(() => {
    const restoredSettings = restoreSettings()

    if (restoredSettings) {
      setSettings(restoredSettings)
      i18n.changeLanguage(restoredSettings.language)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const saveSettings = (updatedSettings) => {
    setSettings(updatedSettings)
    storeSettings(updatedSettings)
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const SettingsConsumer = SettingsContext.Consumer

export const useSettings = () => useContext(SettingsContext)
