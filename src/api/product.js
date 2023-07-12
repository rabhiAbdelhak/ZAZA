import { subDays, subHours, subMinutes } from 'date-fns'
import { dropshipFetch } from './axios'

const now = new Date()

export const images = [
  {
    id: 1,
    url: '/static/shoes1.webp',
  },
  {
    id: 2,
    url: '/static/shoes2.webp',
  },
  {
    id: 3,
    url: '/static/shoes3.webp',
  },
  {
    id: 4,
    url: '/static/shoes7.webp',
  },
  {
    id: 5,
    url: '/static/shoes6.webp',
  },
  {
    id: 6,
    url: '/static/shoes8.jpg',
  },
  {
    id: 7,
    url: '/static/shoes9.jpg',
  },
  {
    id: 8,
    url: '/static/shoes9.jpg',
  },
]

export const categories = [
  {
    id: 1,
    value: 'Movie, Music, Video Games',
    link: '/',
  },
  {
    id: 2,
    value: 'Mobile, Computers',
    link: '/',
  },
  {
    id: 3,
    value: 'Books',
    link: '/',
  },
  {
    id: 4,
    value: 'Home, Kitchen, pets',
    link: '/',
  },
  {
    id: 5,
    value: 'Sports, Fitness, Bags',
    link: '/',
  },
  {
    id: 6,
    value: 'Beauty, Health, Grocery',
    link: '/',
  },
]

class ProductApi {
  async getProducts(filter) {
    let url = '/search?is_dropship=1&'
    const {
      page,
      perPage,
      query,
      min_quantity,
      max_quantity,
      min_price,
      max_price,
      sort,
      sortBy,
      name,
      category,
    } = filter

    if (page) {
      url += `page=${page}&`
    }

    if (perPage) {
      url += `per_page=${perPage}&`
    }

    if (query) {
      url += `query=${query}&`
    }

    if (sort && sortBy) {
      url += `sort=${sort}&`
      url += `sort_direction=${sortBy}&`
    }

    if (name) {
      url += `name=${name}&`
    }

    if (category?.length > 0) {
      url += `category_id=[${category
        .map((cat) => cat.id)
        .join(',')
        .toString()}]&`
    }

    if (min_quantity) {
      url += `min_quantity=${min_quantity}&`
    }

    if (max_quantity && max_quantity !== Infinity) {
      url += `max_quantity=${max_quantity}&`
    }

    if (min_price) {
      url += `min_price=${min_price}&`
    }

    if (max_price && max_price !== Infinity) {
      url += `max_price=${max_price}&`
    }
    console.log(url)
    const { data } = await dropshipFetch(url)
    return data
  }

  async getProductsByCategory() {
    let data = null
    let error = null
    try {
      const { data: products } = await dropshipFetch('/products')
      data = products
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }

  async getProduct(id) {
    const { data } = await dropshipFetch(`/dropship/products/${id}`)
    return data.data
  }

  async subscribe(id) {
    let data = null
    let error = null
    try {
      const { data: successed } = await dropshipFetch.post(
        `/products/${id}/subscribe`,
      )
      data = successed
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }

  async unsubscribe(id) {
    let data = null
    let error = null
    try {
      const { data: successed } = await dropshipFetch.delete(
        `/products/${id}/subscribe`,
      )
      data = successed
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }

  async toggleSubscribe(id, isSubscribe) {
    let result
    if (isSubscribe) {
      result = await dropshipFetch.delete(`/products/${id}/subscribe`)
    } else {
      result = await dropshipFetch.post(`/products/${id}/subscribe`)
    }
    return result.data
  }
}

export const productApi = new ProductApi()

export async function getProducts(filter, axiosOptions) {
  const params = []
  if (filter) {
    for (const property in filter) {
      const value = filter[property]
      if (value) {
        params.push(`${property}=${value}`)
      }
    }
  }
  const query = params?.length ? `?${params.join('&')}` : ''
  const response = await dropshipFetch(`/products${query}`, axiosOptions)
  const { data = [], meta } = response.data
  return { data, meta }
}

export async function getProductDetails(productId, axiosOptions) {
  const { data } = await dropshipFetch.get(
    `/products/${productId}`,
    axiosOptions,
  )

  return data.data
}

export async function createProduct(data) {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('short_description', data.short_description)
  formData.append('description', data.description)
  formData.append('weight', data.weight)
  formData.append('height', data.height)
  formData.append('thickness', data.thickness)
  formData.append('width', data.width)
  formData.append('buying_price', data.buying_price)
  formData.append('price1', data.price1)
  formData.append('price2', data.price2)
  formData.append('price3', data.price3)
  formData.append('reference', data.reference)
  formData.append('provider', data.provider)
  data?.images?.forEach((image) => {
    formData.append('images[]', image)
  })
  const response = await dropshipFetch.post(`/products`, formData)
  return response.data.data
}
async function addProductImage(productId, image) {
  const formData = new FormData()
  formData.append('type', 'image/jpeg')
  formData.append('image', image)
  await dropshipFetch.post(`/products/${productId}/image`, formData)
}
async function removeProductImages(productId, imageUrl) {
  await dropshipFetch.delete(`/products/${productId}/image?url=${imageUrl}`)
}

export async function updateProduct(productId, data) {
  const { imagesToRemove = [], imagesToAdd = [] } = data

  const deletePromises = imagesToRemove.map((el) =>
    removeProductImages(productId, el),
  )
  await Promise.all(deletePromises)

  const addPromises = imagesToAdd.map((el) => addProductImage(productId, el))
  await Promise.all(addPromises)

  const formData = {
    name: data.name,
    short_description: data.short_description,
    description: data.description,
    weight: data.weight,
    height: data.height,
    thickness: data.thickness,
    width: data.width,
    buying_price: data.buying_price,
    price1: data.price1,
    price2: data.price2,
    price3: data.price3,
    reference: data.reference,
    provider: data.provider,
  }
  const response = await dropshipFetch.put(`/products/${productId}`, formData)
  return response.data.data
}

export const searchProducts = async (term) => {
  let url = '/products?per_page=10'

  if (term) {
    url += `&filter[name]=${term}`
  }

  const response = await dropshipFetch(url)

  return response.data.data
}
