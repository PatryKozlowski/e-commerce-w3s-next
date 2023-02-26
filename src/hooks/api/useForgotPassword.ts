import type { ForgotPasswordForm } from '@/components/ForgotPassword/types'
import { forgotPassword } from '@/lib/services/auth/forgotPassword'
import type { ResponseProps } from '@/lib/services/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useForgotPassword = (): UseMutationResult<ResponseProps, unknown, ForgotPasswordForm, unknown> => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordForm) => await forgotPassword(data),
    onSuccess: (data) => {
      if (data.status !== 200) {
        toast.info(data.message)
      }
    }
  })
}
