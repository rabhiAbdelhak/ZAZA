import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as partnerCompanyAPI from '@/api/partner-company'
import toast from 'react-hot-toast'

export const partnerCompanyKeys = {
  all: ['partner-company'],
  lists: () => [...partnerCompanyKeys.all, 'list'] as const,
  list: (filter?: PartnerCompanyListFilter) =>
    [...partnerCompanyKeys.lists(), filter] as const,
  details: (partnerCompanyId?: number | string) =>
    [...partnerCompanyKeys.all, 'details', String(partnerCompanyId)] as const,
  pricing: (
    filter: PartnerCompanyPricingFilter,
    partnerCompanyId?: number | string,
  ) =>
    [
      ...partnerCompanyKeys.all,
      'pricing',
      String(partnerCompanyId),
      JSON.stringify(filter),
    ] as const,
} as const

type PartnerCompanyQueryOptions = {
  enabled?: boolean
}

export function usePartnerCompanysQuery(
  filter?: PartnerCompanyListFilter,
  option?: PartnerCompanyQueryOptions,
) {
  return useQuery({
    queryKey: partnerCompanyKeys.list(filter),
    queryFn: () => partnerCompanyAPI.getPartnerCompanys(filter),
    ...option,
  })
}

export function useCreatePartnerCompanyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<PartnerCompany>) =>
      partnerCompanyAPI.createPartnerCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnerCompanyKeys.lists() })
    },
  })
}

export function useAddDeliveryTypeToDeliveryCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      deliveryTypes,
    }: {
      id: number
      deliveryTypes: DeliveryType[]
    }) =>
      partnerCompanyAPI.AddDeliveryTypeToDeliveryCompany({ id, deliveryTypes }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: partnerCompanyKeys.details(variables.id),
      })
      toast.success('Delivery Type Successfully Added')
    },
  })
}

export function useRemovePartnerCompanyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (partnerCompanyId: number) =>
      partnerCompanyAPI.removePartnerCompany(partnerCompanyId),
    onSuccess: (v, partnerCompanyId) => {
      queryClient.invalidateQueries({ queryKey: partnerCompanyKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: partnerCompanyKeys.details(partnerCompanyId),
      })
    },
  })
}

export function usePartnerCompanyDetailsQuery(partnerCompanyId?: number) {
  return useQuery({
    queryKey: partnerCompanyKeys.details(partnerCompanyId),
    queryFn: () => partnerCompanyAPI.getPartnerCompanyDetails(partnerCompanyId),
    enabled: Boolean(partnerCompanyId),
  })
}

export function usePartnerCompanyPricingQuery(
  filter: PartnerCompanyPricingFilter,
  partnerCompanyId?: number,
) {
  return useQuery({
    queryKey: partnerCompanyKeys.pricing(filter, partnerCompanyId),
    queryFn: () =>
      partnerCompanyAPI.getPartnerCompanyPricing(filter, partnerCompanyId),
    enabled: Boolean(partnerCompanyId),
  })
}

export function usePartnerCompanAddPricingMutation(
  filter: PartnerCompanyPricingFilter,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      pricing,
      partnerCompanyId,
    }: {
      pricing: PartnerCompanyPricingForm
      partnerCompanyId: number
    }) => partnerCompanyAPI.addPartnerCompanyPricing(pricing, partnerCompanyId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          ...partnerCompanyKeys.pricing(filter, variables.partnerCompanyId),
        ],
      })
      queryClient.setQueryData(
        partnerCompanyKeys.pricing(filter, variables?.partnerCompanyId),
        () => data,
      )
    },
  })
}

export function useUpdatePartnerCompanyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (partnerCompany: Partial<PartnerCompany>) =>
      partnerCompanyAPI.updatePartnerCompany(partnerCompany),
    onSuccess: (data, partnerCompany) => {
      queryClient.invalidateQueries({ queryKey: partnerCompanyKeys.lists() })
      queryClient.setQueryData(
        partnerCompanyKeys.details(partnerCompany?.id),
        () => data,
      )
    },
  })
}
