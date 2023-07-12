import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../api/order'

export const orderKeys = {
  all: ['orders'],
  lists: () => [...orderKeys.all, 'list'],
  list: (filter) => [...orderKeys.lists(), filter],
  detail: (id) => [...orderKeys.all, 'detail', String(id)],
}

export function useOrderDetailQuery(orderId, options) {
  return useQuery({
    ...options,
    queryKey: orderKeys.detail(orderId),
    queryFn: () => orderApi.getOrder(orderId),
  })
}

export function useOrderHistoryQuery(orderId, options) {
  return useQuery({
    ...options,
    enabled: true,
    queryKey: ['orders', 'history'],
    queryFn: () => orderApi.getOrderHistory(orderId),
  })
}

export function useGetOrdersQuery(filter, options) {
  return useQuery({
    ...options,
    queryKey: filter ? orderKeys.list(filter) : orderKeys.all,
    queryFn: async ({ signal }) => orderApi.getOrders(filter, { signal }),
  })
}

export function useCreateOrderMutation(options) {
  return useMutation({
    ...options,
    mutationFn: (data) => orderApi.createOrder(data),
  })
}

export function useUpdateOrderMutation(orderid, options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ orderId, data }) => {
      return orderApi.updateOrder(orderId, data)
    },
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: [...orderKeys.all] })
    },
  })
}

export function useUpdateOrderproductsMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ orderId, data }) => {
      return orderApi.updateOrderProducts(orderId, data)
    },
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.all })
    },
  })
}

export function useUpdateOrderStatusMutation(id, options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ order_ids, status }) =>
      orderApi.updateOrderStatus({ order_ids, status }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.all })
    },
  })
}

export function useAssignOrderMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ order_ids, assigned_users }) =>
      orderApi.AssignToUser({ order_ids, assigned_users }),
    onSuccess: (data) => {
      queryClient.setQueryData(orderKeys.detail(data?.id), data)
      return queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
  })
}

export function useUnAssignOrderMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ order_ids, unassigned_users }) =>
      orderApi.UnAssignUser({ order_ids, unassigned_users }),
    onSuccess: (data) => {
      queryClient.setQueryData(orderKeys.detail(data?.id), data)
      return queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
  })
}

export function useImportOrdersMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (formData) => orderApi.importOrders(formData),
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
  })
}

export function useGetOrderComments(orderid, options) {
  return useQuery({
    ...options,
    queryKey: ['comments_' + orderid],
    queryFn: async ({ signal }) =>
      orderApi.getOrderComments(orderid, { signal }),
  })
}

export function useAddOrderCommentMutation(orderid, options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id, description }) =>
      orderApi.addOrderComment({ id, description }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['comments_' + orderid],
      })
    },
  })
}

export function useOrderToPackageMutaion(orderid, options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id }) => orderApi.transformOrderToPackage(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['packages'],
      })
    },
  })
}
