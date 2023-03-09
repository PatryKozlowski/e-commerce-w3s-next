import { blockUser, type BlockUserId } from '@/lib/services/admin/user/blockUser'
import type { ResponseProps } from '@/lib/services/types'
import type { User } from '@prisma/client'
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useBlockUser = (id: string): UseMutationResult<ResponseProps, unknown, BlockUserId, { prevUser: User[] }> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: BlockUserId) => await blockUser(data),
    onMutate: () => {
      const prevUser = queryClient.getQueryData(['users']) as User[]

      return { prevUser }
    },
    onSuccess: async (data) => {
      if (data.status === 200) {
        toast.success(data.message)
      } else {
        toast.info(data.message)
      }
      await queryClient.cancelQueries({ queryKey: ['users'] })
      const prevUser = queryClient.getQueryData(['users']) as User[]
      const user = prevUser.filter((u) => u.id === id)
      user[0].blocked = !user[0].blocked

      return { prevUser }
    },
    onError: (_error, users, ctx) => {
      queryClient.setQueryData(['users'], ctx?.prevUser)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
