import { filterToQueryParameters } from '@/utils/formats'
import { dropshipFetch } from './axios'

export async function getPackagesImportationList(
  filter?: PackageImportationListFilter,
): Promise<PackageImportationList> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/package-importations${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getPackagesImportationDetail(
  importationId?: number,
): Promise<PackageImportationDetail> {
  const { data } = await dropshipFetch.get(
    `/package-importations/${importationId}`,
  )
  return data?.data
}

export async function ImportOrders(data: any) {
  const { data: result } = await dropshipFetch.post(
    `/external-importations-orders/`,
    data,
  )
  console.log(result)
  return result
}

export async function ImportPackages(data: any) {
  const { data: result } = await dropshipFetch.post(
    `/external-importations-packages/`,
    data,
  )
  console.log(result)
  return result
}

export async function ImportProducts(data: any) {
  const { data: result } = await dropshipFetch.post(
    `/external-importations-products/`,
    data,
  )
  console.log(result)
  return result
}

export async function ImportSuppliers(data: any) {
  const { data: result } = await dropshipFetch.post(
    `/external-importations-suppliers/`,
    data,
  )
  console.log(result)
  return result
}
