import { dropshipFetch } from './axios'

export async function getSubscribed() {
  const { data } = await dropshipFetch.get('/notification-settings')
  return data.data
}

export async function subscribe(notification_name) {
  const { data } = await dropshipFetch.post('/notification-settings', {
    notification_name,
  })
  return data.data
}

export async function unsubscribe(notificationId) {
  return dropshipFetch.delete(`/notification-settings/${notificationId}`)
}
