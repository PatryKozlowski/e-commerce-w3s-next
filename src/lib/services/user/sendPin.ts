import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../types'

export const sendPin = async (): Promise<ResponseProps> => {
  return await fetcher('/api/user/send-delete-pin', {
    method: 'POST'
  })
}
