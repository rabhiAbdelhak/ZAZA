import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '../api/category'
import * as productAPI from '../api/product'

export const productKeys = {
  all: ['products'],
  list: (filter) => [...productKeys.all, filter],
  detail: (id) => [...productKeys.all, 'detail', String(id)],
}

export function useProductDropshipDetailQuery(productId, options) {
  return useQuery({
    ...options,
    queryKey: [...productKeys.detail(productId), 'dropship'],
    queryFn: () => productAPI.productApi.getProduct(productId),
  })
}

export function useProductDetailQuery(productId, options) {
  return useQuery({
    ...options,
    queryKey: productKeys.detail(productId),
    queryFn: () => productAPI.getProductDetails(productId),
  })
}

export function useProductsQuery({ filter, options } = {}) {
  return useQuery({
    ...options,
    queryKey: filter ? productKeys.list(filter) : productKeys.all,
    queryFn: async ({ signal }) => productAPI.getProducts(filter, { signal }),
  })
}

export function useSearchProductsQuery({ term, options } = {}) {
  return useQuery({
    ...options,
    queryKey: term ? [term] : productKeys.all,
    queryFn: async () => productAPI.searchProducts(term),
  })
}

export function useProductsSearchQuery(filter, options) {
  return useQuery({
    ...options,
    queryKey: filter ? productKeys.list(filter) : productKeys.all,
    queryFn: async ({ signal }) =>
      productAPI.productApi.getProducts(filter, { signal }),
  })
}

export function useUpdateProductSubscriptionMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id, isSubscribe }) =>
      productAPI.productApi.toggleSubscribe(id, isSubscribe),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useGetProductsByCategoryQuery(options) {
  return useQuery({
    ...options,
    queryKey: productKeys.all,
    queryFn: async ({ signal }) => categoryApi.getCategories(),
  })
}
