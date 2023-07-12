import { dropshipFetch } from './axios'

export async function getProfile() {
  const { data } = await dropshipFetch.get('/profile')
  return data.data
}

export async function updateProfile(profile) {
  const { commune, ...other } = profile
  const dataToSend = commune ? { ...other, commune_id: commune?.id } : profile
  const { data } = await dropshipFetch.put('/profile', dataToSend)
  return data.data
}

export async function uploadAvatar(avatar) {
  if (avatar instanceof File) {
    const formData = new FormData()
    formData.append('picture', avatar)
    formData.append('type', avatar.type)
    const { data } = await dropshipFetch.post('/profile/avatar', formData)
    return data.data.url
  }
  return avatar || ''
}
