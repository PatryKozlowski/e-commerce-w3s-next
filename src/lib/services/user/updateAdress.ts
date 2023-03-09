import type { FormUserAdress } from '@/components/UserAdress/types'
import { fetcher } from '@/lib/utils/fetcher'

interface ResponseProps {
  status: number
  message: string
}

export const updateAdress = async (data: FormUserAdress): Promise<ResponseProps> => {
  return await fetcher('/api/user/update-adress', {
    method: 'POST',
    body: data
  })
}
