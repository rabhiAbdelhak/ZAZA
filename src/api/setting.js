import { dropshipFetch } from './axios'

export async function getSettings() {
  const { data } = await dropshipFetch.get('/user-settings')
  return data.data
}

export async function performSetting({ key, value }) {
  const { data } = await dropshipFetch.post('/user-settings/bulk', [
    { key, value },
  ])
  return data
}
