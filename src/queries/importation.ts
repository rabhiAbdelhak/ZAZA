import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as importationAPI from '@/api/importation'

export const importationKeys = {
  all: ['importation'],
  packages: () => [...importationKeys.all, 'packages'],
  orders: () => [...importationKeys.all, 'orders'],
  packagesList: (filter?: PackageImportationListFilter) => [
    ...importationKeys.packages(),
    filter,
  ],
  packageDetails: (importationId?: number | string) => [
    ...importationKeys.packages(),
    'details',
    String(importationId),
  ],
}

export function usePackagesImportationListQuery(
  filter?: PackageImportationListFilter,
) {
  return useQuery({
    queryKey: importationKeys.packagesList(filter),
    queryFn: async () => importationAPI.getPackagesImportationList(filter),
  })
}

export function usePackagesImportationDetailQuery(importationId?: number) {
  return useQuery({
    queryKey: importationKeys.packageDetails(importationId),
    queryFn: async () =>
      importationAPI.getPackagesImportationDetail(importationId),
    enabled: Boolean(importationId),
  })
}

export function useImportDataMutation() {
  const queryClient = useQueryClient()
  const ImportationMethods = {
    orders: importationAPI.ImportOrders,
    packages: importationAPI.ImportPackages,
    clients: importationAPI.ImportPackages,
    products: importationAPI.ImportProducts,
    suppliers: importationAPI.ImportSuppliers,
  }
  return useMutation({
    mutationFn: ({ data, entity }: { data: any; entity: ImportEntity['id'] }) =>
      ImportationMethods[entity]({ objects: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: importationKeys.orders() })
    },
  })
}
