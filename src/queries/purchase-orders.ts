import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as purchaseOrderAPI from '@/api/purchase-order'

export const purchaseOrderKeys = {
  all: ['purchase-orders'],
  lists: () => [...purchaseOrderKeys.all, 'list'] as const,
  list: (filter?: PurchaseOrderFilter) =>
    [...purchaseOrderKeys.lists(), filter] as const,
  details: (supplierId?: number | string) =>
    [...purchaseOrderKeys.all, 'details', String(supplierId)] as const,
} as const

export function usePurchaseOrderQuery(filter?: PurchaseOrderFilter) {
  return useQuery({
    queryKey: purchaseOrderKeys.list(filter),
    queryFn: () => purchaseOrderAPI.getPurchaseOrders(filter),
  })
}

export function usePurchaseOrderDetailsQuery(purchaseId?: number) {
  return useQuery({
    queryKey: purchaseOrderKeys.details(purchaseId),
    queryFn: () => purchaseOrderAPI.getPurchaseOrderDetails(purchaseId),
    enabled: Boolean(purchaseId),
  })
}

export function useCreatePurchaseOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<PurchaseOrderFormData>) =>
      purchaseOrderAPI.createPurchaseOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.lists() })
    },
  })
}

export function useUpdatePurchaseOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      purchaseId,
      data,
    }: {
      purchaseId: number
      data: Partial<PurchaseOrderFormData>
    }) => purchaseOrderAPI.editPurchaseOrder(purchaseId, data),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.lists() })
      queryClient.setQueryData(
        purchaseOrderKeys.details(params.purchaseId),
        () => data,
      )
    },
  })
}

export function useValidatePurchaseOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      purchaseId,
      isPaid,
    }: {
      purchaseId: number
      isPaid: boolean
    }) => purchaseOrderAPI.validatePurchaseOrder(purchaseId, isPaid),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: purchaseOrderKeys.details(params.purchaseId),
      })
    },
  })
}
