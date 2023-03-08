import { deleteProduct, DeleteProductProps } from '@/lib/services/admin/product/deleteProduct'
import type { ResponseProps } from '@/lib/services/types'
import type { Products } from '@prisma/client'
import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useDeleteProduct = (id: DeleteProductProps): UseMutationResult<ResponseProps, unknown, string, { prevProducts: Products[] }> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => await deleteProduct(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['product'] })
      const prevProducts = queryClient.getQueryData(['product']) as Products[]
      console.log('prevProducts ', prevProducts)
      queryClient.setQueryData(['product'], prevProducts.filter((product) => product.id !== id))
      return { prevProducts }
    },
    onError: (_error, product, ctx) => {
      queryClient.setQueryData(['product'], ctx?.prevProducts)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onSuccess (data) {
      if (data.status === 200) {
        toast.success(data.message)
      } else {
        toast.info(data.message)
      }
    }
  })
}
