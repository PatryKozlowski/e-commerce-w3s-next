import type { RemindPasswordForm } from '@/components/RemindPassword/types'
import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../types'

export const resetPassword = async (data: RemindPasswordForm): Promise<ResponseProps> => {
  const { id, token } = data
  return await fetcher(`/api/auth/reset-password/${id}/${token}`, {
    method: 'PATCH',
    body: data
  })
}
