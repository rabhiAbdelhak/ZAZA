import { dropshipFetch } from './axios'

export async function getStocks(filter) {
  const params = []
  if (filter) {
    for (const property in filter) {
      const value = filter[property]
      if (value) {
        params.push(`${property}=${value}`)
      }
    }
  }
  const query = params?.length ? `?${params.join('&')}` : ''

  const { data } = await dropshipFetch(`/stocks${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getStocksLog(filter) {
  const params = []
  if (filter) {
    for (const property in filter) {
      const value = filter[property]
      if (value) {
        params.push(`${property}=${value}`)
      }
    }
  }
  const query = params?.length ? `?${params.join('&')}` : ''
  const { data } = await dropshipFetch(`/stock-movements${query}`)
  return { data: data.data, meta: data.meta }
}
