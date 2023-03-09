import { premissionUser, type PremissionUserId } from '@/lib/services/admin/user/premissionUser'
import type { ResponseProps } from '@/lib/services/types'
import type { User } from '@prisma/client'
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const usePremissionUser = (id: string): UseMutationResult<ResponseProps, unknown, PremissionUserId, { prevUser: User[] }> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: PremissionUserId) => await premissionUser(data),
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
      user[0].role = user[0].role === 'admin' ? 'user' : 'admin'

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
