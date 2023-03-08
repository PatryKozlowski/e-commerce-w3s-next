import type { EditProdutForm } from '@/components/EditProduct/types'
import { fetcher } from '@/lib/utils/fetcher'

interface ResponseProps {
  status: number
  message: string
}

export const updateProduct = async (id: string, FormData: EditProdutForm): Promise<ResponseProps> => {
  return await fetcher(`/api/admin/product/update-product/${id}`, {
    method: 'PATCH',
    body: FormData
  })
}
