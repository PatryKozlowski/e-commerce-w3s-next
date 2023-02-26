import type { AuthForm } from '@/components/Auth/types'
import { signUp } from '@/lib/services/auth/signUp'
import type { ResponseProps } from '@/lib/services/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

export const useSignUp = (): UseMutationResult<ResponseProps, unknown, AuthForm, unknown> => {
  return useMutation({
    mutationFn: async (FormData: AuthForm) => await signUp(FormData),
    onSuccess: async (data, variables, context) => {
      if (data.status === 200) {
        toast.success(data.message)
        await signIn('credentials', {
          redirect: false,
          email: variables.email,
          password: variables.password,
          callbackUrl: '/'
        })
      } else {
        toast.info(data.message)
      }
    }
  })
}
