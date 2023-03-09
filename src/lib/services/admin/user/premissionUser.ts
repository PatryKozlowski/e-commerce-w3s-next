import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../../types'

export interface PremissionUserId {
  id: string
}

export const premissionUser = async (id: PremissionUserId): Promise<ResponseProps> => {
  return await fetcher('/api/admin/user/premission-user', {
    method: 'PATCH',
    body: id
  })
}
