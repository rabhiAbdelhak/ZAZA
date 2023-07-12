import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as ladingAPI from '../api/landing'

export const landingKeys = {
  all: ['landing'],
  lists: () => [...landingKeys.all, 'list'],
  list: (filter) => [...landingKeys.lists(), filter],
  detail: (id) => [...landingKeys.all, 'detail', id],
}

export function useProductDetailQuery(landingId, options) {
  return useQuery({
    ...options,
    queryKey: landingKeys.detail(landingId),
    queryFn: () => ladingAPI.getLandingDetails(landingId),
  })
}

export function useGetLandingsQuery({ filter, options }) {
  return useQuery({
    ...options,
    queryKey: filter ? landingKeys.list(filter) : landingKeys.all,
    queryFn: async ({ signal }) => ladingAPI.getLandings(filter, { signal }),
  })
}

export function useCreateLandingMutation(options) {
  return useMutation({
    ...options,
    mutationFn: (data) => ladingAPI.createLanding(data),
  })
}

export function useUpdateLandingMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ landingId, data }) =>
      ladingAPI.updateLanding(landingId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(landingKeys.detail(data?.id), data)
      return queryClient.invalidateQueries({ queryKey: landingKeys.lists() })
    },
  })
}
