import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../../types'

export interface DeleteUserId {
  id: string
}

export const deleteUser = async (id: DeleteUserId): Promise<ResponseProps> => {
  return await fetcher('/api/admin/user/delete-user', {
    method: 'DELETE',
    body: id
  })
}
