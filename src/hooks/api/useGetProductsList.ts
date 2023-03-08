import { getProductsList } from '@/lib/services/admin/product/getProductsList'
import type { ProductListProps } from '@/lib/services/types'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export const useGetProductInfo = (): UseQueryResult<ProductListProps[], unknown> => {
  return useQuery(['product'], getProductsList)
}
