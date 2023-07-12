//import ExitVoucherForm from '@/components/dashboard/pruchase-order/exitvoucher-order-form'
//import ExitVoucherProducts from '@/components/dashboard/pruchase-order/exitvoucher-order-products'
import { filterToQueryParameters } from '@/utils/formats'
import { dropshipFetch } from './axios'

export async function getExitVouchers(
  filter?: ExitVoucherFilter,
): Promise<ServerListResponse<ExitVoucher>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/goods_issue_document${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getExitVoucherDetails(
  exitVoucherId?: number,
): Promise<ExitVoucher> {
  const { data } = await dropshipFetch.get(
    `/goods_issue_document/${exitVoucherId}`,
  )
  return data.data
}

export async function createExitVoucher(
  formData: Partial<ExitVoucherFormData>,
): Promise<void> {
  const dataToSend = {
    ...formData,
    products: formData?.products?.map(({ name, images, ...el }) => el) || [],
  }
  const { data } = await dropshipFetch.post(`/goods_issue_document`, dataToSend)
  return data.data
}

export async function editExitVoucher(
  exitVoucherId: number,
  formData: Partial<ExitVoucherFormData>,
): Promise<ExitVoucher> {
  const dataToSend = {
    ...formData,
    products:
      formData?.products?.map((el) => ({
        product_id: el?.id || el?.product_id,
        quantity: el.quantity,
      })) || [],
  }
  const { data } = await dropshipFetch.put(
    `/goods_issue_document/${exitVoucherId}`,
    dataToSend,
  )
  return data.data
}

export async function validateExitVoucher(
  exitVoucherId: number,
): Promise<void> {
  return dropshipFetch.put(`goods_issue_document/${exitVoucherId}/validate`)
}
