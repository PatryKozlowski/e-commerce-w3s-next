import type { CreateProductForm } from '@/components/CreateProduct/types'
import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../../types'

export const createProduct = async (FormData: CreateProductForm): Promise<ResponseProps> => {
  return await fetcher('/api/admin/product/create-product', {
    method: 'POST',
    body: FormData
  })
}
