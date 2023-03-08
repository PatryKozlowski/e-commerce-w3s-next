import { fetcher } from '@/lib/utils/fetcher'
import type { ProductListProps } from '../../types'

export const getProductsList = async (): Promise<ProductListProps[]> => {
  return await fetcher('/api/admin/product/get-products-list', {
    method: 'GET'
  })
}
