import { fetcher } from '@/lib/utils/fetcher'

interface ResponseProps {
  status: number
  message: string
}

export interface DeleteProductProps {
  id: string
}

export const deleteProduct = async (id: DeleteProductProps): Promise<ResponseProps> => {
  return await fetcher('/api/admin/product/delete-product', {
    method: 'DELETE',
    body: id
  })
}
