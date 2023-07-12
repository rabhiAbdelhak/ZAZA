import { filterToQueryParameters } from '@/utils/formats'
import { AxiosRequestConfig } from 'axios'
import { dropshipFetch } from './axios'

export async function getWarehouses(
  filter?: WarehouseListFilter,
): Promise<ServerListResponse<Warhouse>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/warehouses${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getWarehouseDetails(
  warehouseId?: number,
): Promise<Warhouse> {
  const { data } = await dropshipFetch.get(`/warehouses/${warehouseId}`)
  return data.data
}

export async function createWarehouse(
  warehouse: Partial<Warhouse>,
): Promise<Warhouse> {
  const { ...others } = warehouse
  const { data } = await dropshipFetch.post(`/warehouses`, {
    ...others,
  })
  return data.data
}

export async function updateWarehouse(
  warehouse: Partial<Warhouse>,
): Promise<Warhouse> {
  const { id, name, location } = warehouse
  const { data } = await dropshipFetch.put(`/warehouses/${id}`, {
    name,
    location,
  })
  return data.data
}

export async function removeWarehouse(warehouseId: number): Promise<void> {
  return dropshipFetch.delete(`/warehouses/${warehouseId}`)
}

export async function getWarehouseProducts(
  warehouseId?: number,
): Promise<WarhouseProduct[]> {
  const { data } = await dropshipFetch.get(`warehouses/${warehouseId}/products`)
  return data.data
}
