import { fetcher } from '@/lib/utils/fetcher'
import type { User } from '@prisma/client'

export const getUsers = async (): Promise<User[]> => {
  return await fetcher('/api/admin/user/get-users', {
    method: 'GET'
  })
}
