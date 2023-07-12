import { filterToQueryParameters } from '@/utils/formats'
import { dropshipFetch } from './axios'

export async function getEnterVouchers(
  filter?: EnterVoucherFilter,
): Promise<ServerListResponse<EnterVoucher>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/entrance_voucher${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getEnterVoucherDetails(
  enterVoucherId?: number,
): Promise<EnterVoucher> {
  const { data } = await dropshipFetch.get(
    `/entrance_voucher/${enterVoucherId}`,
  )
  return data.data
}

export async function createEnterVoucher(
  formData: Partial<EnterVoucherFormData>,
): Promise<void> {
  const dataToSend = {
    ...formData,
    products: formData?.products?.map(({ name, images, ...el }) => el) || [],
  }
  const { data } = await dropshipFetch.post(`/entrance_voucher`, dataToSend)
  return data.data
}

export async function editEnterVoucher(
  enterVoucherId: number,
  formData: Partial<EnterVoucherFormData>,
): Promise<EnterVoucher> {
  const dataToSend = {
    ...formData,
    products:
      formData?.products?.map((el) => ({
        product_id: el?.id || el?.product_id,
        quantity: el.quantity,
      })) || [],
  }
  const { data } = await dropshipFetch.put(
    `/entrance_voucher/${enterVoucherId}`,
    dataToSend,
  )
  return data.data
}

export async function validateEnterVoucher(
  enterVoucherId: number,
): Promise<void> {
  return dropshipFetch.put(`entrance_voucher/${enterVoucherId}/validate`)
}
