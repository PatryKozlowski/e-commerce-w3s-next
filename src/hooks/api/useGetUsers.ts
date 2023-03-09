import { getUsers } from '@/lib/services/admin/user/getUsers'
import type { User } from '@prisma/client'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export const useGetUsers = (): UseQueryResult<User[], unknown> => {
  return useQuery(['users'], getUsers)
}
