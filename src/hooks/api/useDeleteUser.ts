import { deleteUser, DeleteUserId } from '@/lib/services/admin/user/deleteUser'
import type { ResponseProps } from '@/lib/services/types'
import type { User } from '@prisma/client'
import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useDeleteUser = (id: DeleteUserId): UseMutationResult<ResponseProps, unknown, string, { prevUser: User[] }> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => await deleteUser(id),
    onMutate: async (id: string) => {
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
      const userId = id as unknown as string
      queryClient.setQueryData(['users'], prevUser.filter((u) => u.id !== userId))
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
