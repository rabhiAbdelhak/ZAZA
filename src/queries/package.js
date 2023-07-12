import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  packageApi,
  getPackagesTypes,
  getPackages,
  getPackagesSituation,
} from '../api/package'

export const packageKeys = {
  all: ['package'],
  lists: () => [...packageKeys.all, 'list'],
  list: (filter) => [...packageKeys.lists(), filter],
  detail: (id) => [...packageKeys.all, 'detail', String(id)],
  situations: () => [...packageKeys.all, 'stats'],
  types: () => [...packageKeys.all, 'types'],
}

export function usePackageDetailQuery(packageId, options) {
  return useQuery({
    ...options,
    queryKey: packageKeys.detail(packageId),
    queryFn: () => packageApi.getPackage(packageId),
  })
}

export function useGetPackagesQuery(filter, options) {
  return useQuery({
    ...options,
    queryKey: filter ? packageKeys.list(filter) : packageKeys.all,
    queryFn: async ({ signal }) => getPackages(filter, { signal }),
  })
}

export function useCreatePackageMutation(options) {
  return useMutation({
    ...options,
    mutationFn: (data) => packageApi.createPackage(data),
  })
}

export function useUpdatePackageMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ packageId, data }) => {
      return packageApi.updatePackage(packageId, data)
    },
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: packageKeys.all })
    },
  })
}

export function useImportPackagesMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (formData) => packageApi.importPackages(formData),
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: packageKeys.lists() })
    },
  })
}

export function usePackageSituationQuery(options) {
  return useQuery({
    ...options,
    queryKey: packageKeys.situations(),
    queryFn: async () => getPackagesSituation(),
  })
}

export function usePackagesTypesQuery(options) {
  return useQuery({
    ...options,
    queryKey: packageKeys.types(),
    queryFn: () => getPackagesTypes(),
    staleTime: 5 * 60 * 1000, // 5 minutes ,
  })
}
