import type { EditProdutForm } from '@/components/EditProduct/types'
import { updateProduct } from '@/lib/services/admin/product/updateProduct'
import type { ResponseProps } from '@/lib/services/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useUpdateProduct = (id: string): UseMutationResult<ResponseProps, unknown, EditProdutForm, unknown> => {
  return useMutation({
    mutationFn: async (data: EditProdutForm) => await updateProduct(id, data),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message)
      } else {
        toast.info(data.message)
      }
    }
  })
}
