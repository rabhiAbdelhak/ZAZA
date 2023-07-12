import { dropshipFetch } from './axios'

export async function getTemplates() {
  const { data } = await dropshipFetch('/templates')
  return data.data
}
