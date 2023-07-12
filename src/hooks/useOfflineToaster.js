import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useOfflineToaster() {
  const { t } = useTranslation()
  useEffect(() => {
    let toastId
    const offlineListener = () => {
      toastId = toast.loading(t('Offline.OfflineMessage'))
    }
    const onlineLisner = () => {
      toast.success(t('Offline.OnlineMessage'), {
        id: toastId,
      })
    }
    window.addEventListener('offline', offlineListener)
    window.addEventListener('online', onlineLisner)

    return () => {
      window.removeEventListener('offline', offlineListener)
      window.removeEventListener('online', onlineLisner)
    }
  }, [])
}
