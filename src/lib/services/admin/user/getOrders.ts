import type { OrderProps } from '@/components/Order/types'
import { fetcher } from '@/lib/utils/fetcher'

export const getOrders = async (id: string): Promise<OrderProps[]> => {
  return await fetcher(`/api/admin/user/get-orders/${id}`, {
    method: 'GET'
  })
}
