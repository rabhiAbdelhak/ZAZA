import { useQuery } from '@tanstack/react-query'
import * as templateAPI from '../api/template'

export const templateKeys = {
  all: ['templates'],
}

export function useTemplatesQuery(options) {
  return useQuery({
    ...options,
    queryKey: templateKeys.all,
    queryFn: () => templateAPI.getTemplates(),
  })
}
