import { useQuery } from '@tanstack/react-query'
import * as helpersAPI from '../api/helpers'

export const communeKeys = {
  all: ['communes'],
  wilayas: ['wilayas'],
  byWilaya: (wilaya_id) => ['communes', wilaya_id],
}

export function useCommunesQuery(options) {
  return useQuery({
    staleTime: 360 * 24 * 60 * 1000,
    cachesTime: 360 * 24 * 60 * 1000,
    ...options,
    queryKey: communeKeys.all,
    queryFn: () => helpersAPI.getCommunes(),
  })
}

export function useWilayasQuery(options) {
  return useQuery({
    staleTime: 360 * 24 * 60 * 1000,
    cachesTime: 360 * 24 * 60 * 1000,
    ...options,
    queryKey: communeKeys.wilayas,
    queryFn: () => helpersAPI.getWilayas(),
  })
}

export function useCommunesByWialayaQuery(wilaya_id, options = {}) {
  return useQuery({
    staleTime: 360 * 24 * 60 * 1000,
    cachesTime: 360 * 24 * 60 * 1000,
    ...options,
    queryKey: communeKeys.byWilaya(wilaya_id),
    queryFn: () => helpersAPI.getWlayaCommunes(wilaya_id),
  })
}
