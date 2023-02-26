import { fetcher } from '@/lib/utils/fetcher'
import type { AuthForm } from '@/components/Auth/types'
import type { ResponseProps } from '../types'

export const signUp = async (data: AuthForm): Promise<ResponseProps> => {
  return await fetcher('/api/auth/signup', {
    method: 'POST',
    body: data
  })
}
