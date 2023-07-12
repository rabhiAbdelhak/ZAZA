import { filterToQueryParameters } from '@/utils/formats'
import { AxiosRequestConfig } from 'axios'
import { dropshipFetch } from './axios'

export async function getSuppliers(
  filter?: SupplierListFilter,
): Promise<ServerListResponse<Supplier>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(`/suppliers${query}`)
  return { data: data.data, meta: data.meta }
}

export async function getSupplierDetails(
  supplierId?: number,
): Promise<Supplier> {
  const { data } = await dropshipFetch.get(`/suppliers/${supplierId}`)
  return data.data
}

export async function createSupplier(
  supplier: Partial<Supplier>,
): Promise<Supplier> {
  const { addresses, contacts, logo, ...others } = supplier
  const formatedAdresses = addresses?.map((el) => ({
    street: el.street,
    commune_id: el.commune.id,
  }))
  const { data } = await dropshipFetch.post(`/suppliers`, {
    ...others,
    ...(!!formatedAdresses?.length && { addresses: formatedAdresses }),
    ...(!!contacts?.length && { contacts }),
  })
  return data.data
}

export async function updateSupplier(
  supplier: Partial<Supplier>,
): Promise<Supplier> {
  const { addresses, contacts, logo, id, ...others } = supplier
  const { data } = await dropshipFetch.put(`/suppliers/${supplier.id}`, others)
  return data.data
}

export async function removeSupplier(supplierId: number): Promise<void> {
  return dropshipFetch.delete(`/suppliers/${supplierId}`)
}

export async function addSupplierAddress(
  supplierId: number,
  address: Omit<SupplierAddress, 'id'>,
): Promise<Supplier> {
  const { data } = await dropshipFetch.post(
    `/suppliers/${supplierId}/addresses`,
    {
      addresses: [
        {
          commune_id: address.commune.id,
          street: address.street,
        },
      ],
    },
  )
  return data.data
}

export async function removeSupplierAddress(
  supplierId: number,
  addressIds: number[],
): Promise<Supplier> {
  const { data } = await dropshipFetch.delete(
    `/suppliers/${supplierId}/addresses`,
    { data: { address_ids: addressIds } },
  )
  return data.data
}

export async function addSupplierContact(
  supplierId: number,
  contacts: Omit<SupplierContact, 'id'>,
): Promise<Supplier> {
  const { data } = await dropshipFetch.post(
    `/suppliers/${supplierId}/contacts`,
    { contacts: [contacts] },
  )
  return data.data
}

export async function removeSupplierContact(
  supplierId: number,
  contactIds: number[],
): Promise<Supplier> {
  const { data } = await dropshipFetch.delete(
    `/suppliers/${supplierId}/contacts`,
    { data: { contact_ids: contactIds } },
  )
  return data.data
}

export async function assignProductsToSupplier(
  supplierId: number,
  products: any[],
): Promise<void> {
  const dataToSend = [
    {
      supplier_id: supplierId,
      products: products.map((el) => ({
        product_id: el.id,
        price: el.price || 0,
      })),
    },
  ]
  await dropshipFetch.post(`assign-suppliers-products`, dataToSend)
}
export async function unassignProductsToSupplier(
  supplierId: number,
  productIds: number[],
): Promise<void> {
  const dataToSend = [
    {
      supplier_id: supplierId,
      product_ids: productIds,
    },
  ]
  await dropshipFetch.delete(`assign-suppliers-products`, { data: dataToSend })
}

export async function getSupplierProducts(
  supplierId?: number,
): Promise<SupplierProduct[]> {
  const { data } = await dropshipFetch.get(`suppliers/${supplierId}/products`)
  return data.data
}

export async function getSupplierDetailPayments(
  supplierId?: number,
  filter?: SupplierPaymentsFilter,
  axiosOptions?: AxiosRequestConfig<any>,
): Promise<ServerListResponse<SupplierPayment>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(
    `/suppliers/${supplierId}/payments${query}`,
    axiosOptions,
  )
  return { data: data.data, meta: data.meta }
}

export async function getSupplierPaymentList(
  filter?: SupplierPaymentsFilter,
  axiosOptions?: AxiosRequestConfig<any>,
): Promise<ServerListResponse<SupplierPayment>> {
  const query = filterToQueryParameters(filter)
  const { data } = await dropshipFetch.get(
    `/supplier_payment_journals${query}`,
    axiosOptions,
  )
  return { data: data.data, meta: data.meta }
}

export async function addSupplierPayments(postData: {
  supplier_id: number
  amount: number
  date: string
}): Promise<void> {
  await dropshipFetch.post(`/supplier_payment_journals`, postData)
}

export async function updateSupplierPayments(
  postData: {
    supplier_id: number
    amount: number
    date: string
  },
  paymentId: number,
): Promise<void> {
  await dropshipFetch.put(`/supplier_payment_journals/${paymentId}`, postData)
}
