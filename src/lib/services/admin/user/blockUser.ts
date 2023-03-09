import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../../types'

export interface BlockUserId {
  id: string
}

export const blockUser = async (id: BlockUserId): Promise<ResponseProps> => {
  return await fetcher('/api/admin/user/block-user', {
    method: 'PATCH',
    body: id
  })
}
