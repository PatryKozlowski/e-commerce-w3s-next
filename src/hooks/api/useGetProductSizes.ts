import { getProductSizes } from '@/lib/services/admin/product/getProductSizes'
import type { ProductSizes } from '@/lib/services/types'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export const useGetProductSizes = (id: string): UseQueryResult<ProductSizes[], unknown> => {
  return useQuery(['sizes', id], async () => await getProductSizes(id))
}
