import type { ForgotPasswordForm } from '@/components/ForgotPassword/types'
import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../types'

export const forgotPassword = async (data: ForgotPasswordForm): Promise<ResponseProps> => {
  return await fetcher('/api/auth/forgot-password', {
    method: 'POST',
    body: data
  })
}
