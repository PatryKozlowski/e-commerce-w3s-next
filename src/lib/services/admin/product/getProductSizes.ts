import { fetcher } from '@/lib/utils/fetcher'
import type { ProductSizes } from '../../types'

export const getProductSizes = async (id: string): Promise<ProductSizes[]> => {
  return await fetcher(`/api/admin/product/get-product-sizes/${id}`, {
    method: 'GET'
  })
}
