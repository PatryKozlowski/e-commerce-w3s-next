import { fetcher } from '@/lib/utils/fetcher'
import type { ResponseProps } from '../types'

export interface DeleteAccountPin {
  pin: string
}

export const deleteAccount = async (pin: DeleteAccountPin): Promise<ResponseProps> => {
  return await fetcher('/api/user/delete-account', {
    method: 'POST',
    body: pin
  })
}
