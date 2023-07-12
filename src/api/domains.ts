import { dropshipFetch } from './axios'

export async function getDomains(): Promise<Domain[]> {
  const { data } = await dropshipFetch.get(`/domains`)
  return data.data
}

export async function createDomain(domain: string): Promise<Domain> {
  const formData = new FormData()
  formData.append('name', domain)
  const { data } = await dropshipFetch.post(`/domains`, formData)
  return data.data
}

export async function removeDomain(domainId: number): Promise<void> {
  return dropshipFetch.delete(`/domains/${domainId}`)
}
