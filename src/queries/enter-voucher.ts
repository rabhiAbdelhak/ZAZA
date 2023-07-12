import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as entervoucherAPI from '@/api/enter-voucher'

export const enterVoucherKeys = {
  all: ['enter-vouchers'],
  lists: () => [...enterVoucherKeys.all, 'list'] as const,
  list: (filter?: EnterVoucherFilter) =>
    [...enterVoucherKeys.lists(), filter] as const,
  details: (enterCoucherId?: number | string) =>
    [...enterVoucherKeys.all, 'details', String(enterCoucherId)] as const,
} as const

export function useEnterVouchersQuery(filter?: EnterVoucherFilter) {
  return useQuery({
    queryKey: enterVoucherKeys.list(filter),
    queryFn: () => entervoucherAPI.getEnterVouchers(filter),
  })
}

export function useEnterVoucherDetailsQuery(enterVoucherId?: number) {
  return useQuery({
    queryKey: enterVoucherKeys.details(enterVoucherId),
    queryFn: () => entervoucherAPI.getEnterVoucherDetails(enterVoucherId),
    enabled: Boolean(enterVoucherId),
  })
}

export function useCreateEnterVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<EnterVoucherFormData>) =>
      entervoucherAPI.createEnterVoucher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enterVoucherKeys.lists() })
    },
  })
}

export function useUpdateEnterVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      enterVoucherId,
      data,
    }: {
      enterVoucherId: number
      data: Partial<EnterVoucherFormData>
    }) => entervoucherAPI.editEnterVoucher(enterVoucherId, data),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: enterVoucherKeys.lists() })
      queryClient.setQueryData(
        enterVoucherKeys.details(params.enterVoucherId),
        () => data,
      )
    },
  })
}

export function useValidateEnterVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ enterVoucherId }: { enterVoucherId: number }) =>
      entervoucherAPI.validateEnterVoucher(enterVoucherId),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: enterVoucherKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: enterVoucherKeys.details(params.enterVoucherId),
      })
    },
  })
}
