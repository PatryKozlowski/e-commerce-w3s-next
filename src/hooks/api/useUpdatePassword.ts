import type { UpdatePasswordForm } from '@/components/UserChangePassword/types'
import type { ResponseProps } from '@/lib/services/types'
import { updatePassword } from '@/lib/services/user/updatePassword'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'

export const useUpdatePassword = (): UseMutationResult<ResponseProps, unknown, UpdatePasswordForm, unknown> => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordForm) => await updatePassword(data)
  })
}
