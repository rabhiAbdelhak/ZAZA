import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import * as domainAPI from '@/api/domains'
import { boolean } from 'yup'

export const domainsKeys = {
  all: ['domains'] as const,
  details: (domainId?: number | string) =>
    [...domainsKeys.all, String(domainId)] as const,
} as const

type DomainsQueryOptions = { enabled?: boolean }

export function useDomainsQuery({ enabled = true }: DomainsQueryOptions = {}) {
  return useQuery<Domain[]>({
    queryKey: domainsKeys.all,
    queryFn: async () => domainAPI.getDomains(),
    staleTime: 5 * 1000, // 5 minutes
    enabled,
  })
}

export function useCreateDomainMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (domain: string) => domainAPI.createDomain(domain),
    onSuccess: (data) => {
      queryClient.setQueryData<Domain[]>(domainsKeys.all, (oldData = []) => [
        data,
        ...oldData,
      ])
    },
  })
}

export function useRemoveDomainMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (domainId: number) => domainAPI.removeDomain(domainId),
    onSuccess: (data, domainId) => {
      queryClient.setQueryData<Domain[]>(domainsKeys.all, (oldData = []) =>
        oldData.filter((el) => el.id !== domainId),
      )
    },
  })
}
