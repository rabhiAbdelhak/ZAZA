import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '../api/category'

export const categoryKeys = {
  all: ['categories'],
  list: (filter) => [...categoryKeys.all, filter],
  detail: (id) => [...categoryKeys.all, 'detail', id],
}

export function useGetCategoriesQuery({ filter, options } = {}) {
  return useQuery({
    ...options,
    queryKey: filter ? categoryKeys.list(filter) : categoryKeys.all,
    queryFn: async ({ signal }) =>
      categoryApi.getCategories(filter, { signal }),
  })
}
