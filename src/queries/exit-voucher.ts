import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as exitvoucherAPI from '@/api/exit-voucher'

export const exitVoucherKeys = {
  all: ['exit-vouchers'],
  lists: () => [...exitVoucherKeys.all, 'list'] as const,
  list: (filter?: ExitVoucherFilter) =>
    [...exitVoucherKeys.lists(), filter] as const,
  details: (exitVoucherId?: number | string) =>
    [...exitVoucherKeys.all, 'details', String(exitVoucherId)] as const,
} as const

export function useExitVouchersQuery(filter?: ExitVoucherFilter) {
  return useQuery({
    queryKey: exitVoucherKeys.list(filter),
    queryFn: () => exitvoucherAPI.getExitVouchers(filter),
  })
}

export function useExitVoucherDetailsQuery(exitVoucherId?: number) {
  return useQuery({
    queryKey: exitVoucherKeys.details(exitVoucherId),
    queryFn: () => exitvoucherAPI.getExitVoucherDetails(exitVoucherId),
    enabled: Boolean(exitVoucherId),
  })
}

export function useCreateExitVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<ExitVoucherFormData>) =>
      exitvoucherAPI.createExitVoucher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exitVoucherKeys.lists() })
    },
  })
}

export function useUpdateExitVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      exitVoucherId,
      data,
    }: {
      exitVoucherId: number
      data: Partial<ExitVoucherFormData>
    }) => exitvoucherAPI.editExitVoucher(exitVoucherId, data),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: exitVoucherKeys.lists() })
      queryClient.setQueryData(
        exitVoucherKeys.details(params.exitVoucherId),
        () => data,
      )
    },
  })
}

export function useValidateExitVoucherMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ exitVoucherId }: { exitVoucherId: number }) =>
      exitvoucherAPI.validateExitVoucher(exitVoucherId),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: exitVoucherKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: exitVoucherKeys.details(params.exitVoucherId),
      })
    },
  })
}
