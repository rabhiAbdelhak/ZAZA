import { dropshipFetch } from './axios'

const now = new Date()

class CategoryApi {
  async getCategories(options) {
    //fetch all categories
    const { data } = await dropshipFetch('/categories')
    return data.data
  }

  async getCategory(id) {
    //fetch a single category
    let data = null
    let error = null
    try {
      const { data: products } = await dropshipFetch(`/categories/${id}`)
      data = products
    } catch (err) {
      error = err.response.data
    }

    return { error, data }
  }
}

export const categoryApi = new CategoryApi()
