import { CreateProductForm } from '@/components/CreateProduct/types'
import { createProduct } from '@/lib/services/admin/product/createProduct'
import type { ResponseProps } from '@/lib/services/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useCreateProduct = (): UseMutationResult<ResponseProps, unknown, CreateProductForm, unknown> => {
  return useMutation({
    mutationFn: async (data: CreateProductForm) => await createProduct(data),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message)
      } else {
        toast.info(data.message)
      }
    }
  })
}
