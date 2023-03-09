import type { ResponseProps } from '@/lib/services/types'
import { deleteAccount, DeleteAccountPin } from '@/lib/services/user/deleteAccount'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'

export const useDeleteAccount = (): UseMutationResult<ResponseProps, unknown, DeleteAccountPin, unknown> => {
  return useMutation({
    mutationFn: async (data: DeleteAccountPin) => await deleteAccount(data)
  })
}
