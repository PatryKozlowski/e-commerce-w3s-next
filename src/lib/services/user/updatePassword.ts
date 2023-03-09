import type { UpdatePasswordForm } from '@/components/UserChangePassword/types'
import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../types'

export const updatePassword = async (data: UpdatePasswordForm): Promise<ResponseProps> => {
  return await fetcher('/api/user/update-password/', {
    method: 'PATCH',
    body: data
  })
}
