import type { OrderProps } from '@/components/Order/types'
import { getOrders } from '@/lib/services/admin/user/getOrders'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export const useGetOrders = (id: string): UseQueryResult<OrderProps[], unknown> => {
  return useQuery(['orders', id], async () => await getOrders(id))
}
