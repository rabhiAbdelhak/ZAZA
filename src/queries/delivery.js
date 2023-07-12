import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as deliveryAPI from '../api/delivery'
import toast from 'react-hot-toast'

export const deliveryKeys = {
  all: ['delivery'],
  types: () => [...deliveryKeys.all, 'types'],
  delivery: () => [...deliveryKeys.all, 'delivery'],
  directDelivery: () => [...deliveryKeys.delivery(), 'direct'],
  officeDelivery: () => [...deliveryKeys.delivery(), 'office'],
  byWilayaId: (wilayaId) => [...deliveryKeys.directDelivery(), wilayaId],
  byOfficeFilter: (filter = {}) => [...deliveryKeys.officeDelivery(), filter],
  byCompaniesFilter: (filter = {}) => [
    ...deliveryKeys.officeDelivery(),
    filter,
  ],
}

export function useDeliveryTypesQuery(options) {
  return useQuery({
    staleTime: 5 * 60 * 1000,
    ...options,
    queryKey: deliveryKeys.types(),
    queryFn: async () => deliveryAPI.getDeliveryTypes(),
  })
}
export function getDeliveryCompanies(wilayaId) {
  return useQuery({
    //queryKey: [...deliveryKeys.all, wilayaId],
    queryFn: async () => deliveryAPI.getDeliveryCompanies(wilayaId),
  })
}
export function getDeliveryCompaniesOffices(communeId, companyId) {
  return useQuery({
    queryKey: [...deliveryKeys.all, [companyId, communeId]],
    queryFn: async () =>
      deliveryAPI.getDeliveryCompaniesOffices(communeId, companyId),
  })
}
export function getDeliveryCompaniesTypes(companyId) {
  return useQuery({
    queryKey: deliveryKeys.types(),
    queryFn: async () => deliveryAPI.getDeliveryCompaniesTypes(companyId),
  })
}

export function useDeliveryWilayaIdQuery(wilayaId, options) {
  return useQuery({
    ...options,
    queryKey: deliveryKeys.byWilayaId(wilayaId),
    queryFn: async () => deliveryAPI.getDeliveryCostByWilayaId(wilayaId),
  })
}

export function useOfficeDeliveryQuery(filter, options) {
  return useQuery({
    ...options,
    queryKey: deliveryKeys.byOfficeFilter(filter),
    queryFn: async () => deliveryAPI.getOfficeDeliveryCost(filter),
  })
}

export function useAddDeliveryTypeToDeliveryCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, deliveryTypes }) =>
      deliveryAPI.AddDeliveryTypeToDeliveryCompany({ id, deliveryTypes }),
    onSuccess: () => {
      //queryClient.invalidateQueries('GetDeliveryCompanies')
      toast.success('Delivery Type Successfully Added')
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message)
    },
  })
}

export function useGetDeliveryTypeByDeliveryCompany(
  wilayaId,
  DeliveryCompanyID,
) {
  return useQuery({
    //queryKey: 'GetDeliveryCompanies',
    //queryKey: deliveryKeys.byWilayaId(wilayaId),
    queryKey: [...deliveryKeys.all, [DeliveryCompanyID, wilayaId]],
    queryFn: async () =>
      deliveryAPI.useGetDeliveryTypeByDeliveryCompany(
        wilayaId,
        DeliveryCompanyID,
      ),
  })
}
