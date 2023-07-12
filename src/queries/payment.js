import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { paymentApi } from '../api/payment'

export const paymentKeys = {
  all: ['payment'],
  lists: () => [...paymentKeys.all, 'list'],
  list: (filter) => [...paymentKeys.lists(), filter],
  detail: (id) => [...paymentKeys.all, 'detail', String(id)],
  stats: ['stats'],
}

export function usePaymentDetailQuery(paymentId, options) {
  return useQuery({
    ...options,
    queryKey: paymentKeys.detail(paymentId),
    queryFn: () => paymentApi.getPayment(paymentId),
  })
}

export function useGetPaymentsQuery(filter, options) {
  return useQuery({
    ...options,
    queryKey: filter ? paymentKeys.list(filter) : paymentKeys.all,
    queryFn: async ({ signal }) => paymentApi.getPayments(filter, { signal }),
  })
}

export function useConfirmPaymentMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ paymentId }) => {
      return paymentApi.confirmPayment(paymentId)
    },
    onSuccess: (data) => {
      return queryClient.invalidateQueries({ queryKey: paymentKeys.all })
    },
  })
}
export function usePaymentVerification() {
  return useMutation({
    mutationFn: paymentApi.getPaymentsVerificationState,
    // onSuccess: (data) => console.log('data is:', data),
    onError: (error) => {
      console.log(error.response.data)
      console.log(error.response.status)
    },
  })
}

export function usePaymentConfirmation() {
  return useMutation({
    mutationFn: paymentApi.getPaymentsConfirmation,
  })
}

export function useGetPacakgesBySituationStats(options) {
  return useQuery({
    ...options,
    queryKey: paymentKeys.stats,
    queryFn: async ({ signal }) => paymentApi.getPaymentsSituationStats(),
  })
}
