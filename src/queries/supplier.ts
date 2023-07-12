import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as supplierAPI from '@/api/supplier'
import * as paymentAPI from '@/api/payement'

export const supplierKeys = {
  all: ['supplier'],
  lists: () => [...supplierKeys.all, 'list'] as const,
  list: (filter?: SupplierListFilter) =>
    [...supplierKeys.lists(), filter] as const,
  details: (supplierId?: number | string) =>
    [...supplierKeys.all, 'details', String(supplierId)] as const,
  products: (supplierId?: number | string) =>
    [...supplierKeys.details(supplierId), 'products'] as const,
  payments: () => [...supplierKeys.all, 'payments'] as const,
  paymentsList: (filter?: SupplierListFilter) =>
    [...supplierKeys.payments(), filter] as const,
  paymentsDetails: (supplierId?: number | string) =>
    [...supplierKeys.payments(), String(supplierId)] as const,
  paymentsDetailFilter: (
    supplierId?: number | string,
    filter?: SupplierListFilter,
  ) => [...supplierKeys.paymentsDetails(supplierId), filter] as const,
} as const

type SupplierQueryOptions = {
  enabled?: boolean
}

export function useSuppliersQuery(
  filter?: SupplierListFilter,
  option?: SupplierQueryOptions,
) {
  return useQuery({
    queryKey: supplierKeys.list(filter),
    queryFn: () => supplierAPI.getSuppliers(filter),
    ...option,
  })
}

export function useCreateSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Supplier>) => supplierAPI.createSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
    },
  })
}

export function useRemoveSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (supplierId: number) => supplierAPI.removeSupplier(supplierId),
    onSuccess: (v, supplierId) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: supplierKeys.details(supplierId),
      })
    },
  })
}

export function useSupplierDetailsQuery(supplierId?: number) {
  return useQuery({
    queryKey: supplierKeys.details(supplierId),
    queryFn: () => supplierAPI.getSupplierDetails(supplierId),
    enabled: Boolean(supplierId),
  })
}

export function useUpdateSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (supplier: Partial<Supplier>) =>
      supplierAPI.updateSupplier(supplier),
    onSuccess: (data, supplier) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.setQueryData(supplierKeys.details(supplier?.id), () => data)
    },
  })
}

export function useAddAddressSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      address,
    }: {
      supplierId: number
      address: Omit<SupplierAddress, 'id'>
    }) => supplierAPI.addSupplierAddress(supplierId, address),
    onSuccess: (data, supplier) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.setQueryData(
        supplierKeys.details(supplier.supplierId),
        () => data,
      )
    },
  })
}

export function useRemoveAddressSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      addressIds,
    }: {
      supplierId: number
      addressIds: number[]
    }) => supplierAPI.removeSupplierAddress(supplierId, addressIds),
    onSuccess: (data, supplier) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.setQueryData(
        supplierKeys.details(supplier.supplierId),
        () => data,
      )
    },
  })
}

export function useAddContactSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      contact,
    }: {
      supplierId: number
      contact: Omit<SupplierContact, 'id'>
    }) => supplierAPI.addSupplierContact(supplierId, contact),
    onSuccess: (data, contact) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.setQueryData(
        supplierKeys.details(contact.supplierId),
        () => data,
      )
    },
  })
}

export function useRemoveContactSupplierMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      contactIds,
    }: {
      supplierId: number
      contactIds: number[]
    }) => supplierAPI.removeSupplierContact(supplierId, contactIds),
    onSuccess: (data, supplier) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      queryClient.setQueryData(
        supplierKeys.details(supplier.supplierId),
        () => data,
      )
    },
  })
}

export function useSupplierProductQuery(supplierId?: number) {
  return useQuery({
    queryKey: supplierKeys.products(supplierId),
    queryFn: () => supplierAPI.getSupplierProducts(supplierId),
    enabled: Boolean(supplierId),
  })
}

export function useAssignSupplierProductsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      products,
    }: {
      supplierId: number
      products: any[]
    }) => supplierAPI.assignProductsToSupplier(supplierId, products),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.products(params.supplierId),
      })
    },
  })
}

export function useUnassignSupplierProductsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      supplierId,
      productIds,
    }: {
      supplierId: number
      productIds: number[]
    }) => supplierAPI.unassignProductsToSupplier(supplierId, productIds),
    onSuccess: (data, params) => {
      queryClient.setQueryData(
        supplierKeys.products(params.supplierId),
        (oldData: any[] = []) =>
          oldData.filter((el) => !params.productIds.includes(el.id)),
      )
    },
  })
}

export function useSupplierDetailsPaymentsQuery(
  supplierId?: number,
  filter?: SupplierPaymentsFilter,
) {
  return useQuery({
    queryKey: supplierKeys.paymentsDetailFilter(supplierId, filter),
    queryFn: ({ signal }) =>
      supplierAPI.getSupplierDetailPayments(supplierId, filter, { signal }),
    enabled: Boolean(supplierId),
  })
}

export function useSupplierPaymentsQuery(filter?: SupplierPaymentsFilter) {
  return useQuery({
    queryKey: supplierKeys.paymentsList(filter),
    queryFn: ({ signal }) =>
      supplierAPI.getSupplierPaymentList(filter, { signal }),
  })
}

export function useAddSupplierPaymentsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { date: string; supplier_id: number; amount: number }) =>
      supplierAPI.addSupplierPayments(data),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.payments(),
      })
      queryClient.invalidateQueries({
        queryKey: supplierKeys.details(params.supplier_id),
      })
    },
  })
}

export function useUpdateSupplierPaymentsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {
      date: string
      supplier_id: number
      amount: number
      paymentId: number
    }) =>
      supplierAPI.updateSupplierPayments(
        {
          amount: data.amount,
          date: data.date,
          supplier_id: data.supplier_id,
        },
        data.paymentId,
      ),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.payments(),
      })
      queryClient.invalidateQueries({
        queryKey: supplierKeys.details(params.supplier_id),
      })
    },
  })
}

export function useValidateSupplierPaymentsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { supplierId: number; paymentId: number }) =>
      paymentAPI.validatePayment(data.paymentId),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.payments(),
      })
      queryClient.invalidateQueries({
        queryKey: supplierKeys.details(params.supplierId),
      })
    },
  })
}

export function useCancelSupplierPaymentsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { supplierId: number; paymentId: number }) =>
      paymentAPI.cancelPayment(data.paymentId),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.payments(),
      })
      queryClient.invalidateQueries({
        queryKey: supplierKeys.details(params.supplierId),
      })
    },
  })
}
