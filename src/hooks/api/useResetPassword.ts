import type { RemindPasswordForm } from '@/components/RemindPassword/types'
import { resetPassword } from '@/lib/services/auth/resetPassword'
import type { ResponseProps } from '@/lib/services/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useResetPassword = (): UseMutationResult<ResponseProps, unknown, RemindPasswordForm, unknown> => {
  return useMutation({
    mutationFn: async (data: RemindPasswordForm) => await resetPassword(data),
    onSuccess: (data) => {
      if (data.status !== 200) {
        toast.info(data.message)
      }
    }
  })
}
