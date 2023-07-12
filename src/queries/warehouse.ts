import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as warehouseAPI from '@/api/warehouse'

export const warehouseKeys = {
  all: ['warehouse'],
  lists: () => [...warehouseKeys.all, 'list'] as const,
  list: (filter?: WarehouseListFilter) =>
    [...warehouseKeys.lists(), filter] as const,
  details: (warehouseId?: number | string) =>
    [...warehouseKeys.all, 'details', String(warehouseId)] as const,
  products: (warehouseId?: number | string) =>
    [...warehouseKeys.details(warehouseId), 'products'] as const,
} as const

type WarehouseQueryOptions = {
  enabled?: boolean
}

export function useWarehousesQuery(
  filter?: WarehouseListFilter,
  option?: WarehouseQueryOptions,
) {
  return useQuery({
    queryKey: warehouseKeys.list(filter),
    queryFn: () => warehouseAPI.getWarehouses(filter),
    ...option,
  })
}

export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Warhouse>) => warehouseAPI.createWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
    },
  })
}

export function useRemoveWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { warehouseId: number }) =>
      warehouseAPI.removeWarehouse(data.warehouseId),
    onSuccess: (v, data) => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: warehouseKeys.details(data.warehouseId),
      })
    },
  })
}

export function useWarehouseDetailsQuery(warehouseId?: number) {
  return useQuery({
    queryKey: warehouseKeys.details(warehouseId),
    queryFn: () => warehouseAPI.getWarehouseDetails(warehouseId),
    enabled: Boolean(warehouseId),
  })
}

export function useUpdateWarehouseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (warehouse: Partial<Warhouse>) =>
      warehouseAPI.updateWarehouse(warehouse),
    onSuccess: (data, warehouse) => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
      queryClient.setQueryData(warehouseKeys.details(warehouse?.id), () => data)
    },
  })
}

export function useWarehouseProductQuery(warehouseId?: number) {
  return useQuery({
    queryKey: warehouseKeys.products(warehouseId),
    queryFn: () => warehouseAPI.getWarehouseProducts(warehouseId),
    enabled: Boolean(warehouseId),
  })
}
