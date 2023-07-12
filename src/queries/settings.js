import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as settingAPI from '../api/setting'

export const settingKeys = {
  all: ['settings'],
}

export function useSettingsQuery(options) {
  return useQuery({
    ...options,
    queryKey: settingKeys.all,
    queryFn: () => settingAPI.getSettings(),
  })
}

export function usePerformSettingMutation(options) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ key, value }) => {
      return settingAPI.performSetting({ key, value })
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: settingKeys.all })
    },
  })
}
