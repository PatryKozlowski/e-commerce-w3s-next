import type { AuthForm } from '@/components/Auth/types'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { signIn, type SignInResponse } from 'next-auth/react'
import { toast } from 'react-toastify'

export const useSignIn = (): UseMutationResult<SignInResponse | undefined, unknown, AuthForm, unknown> => {
  return useMutation({
    mutationFn: async (data: AuthForm) => await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/'
    }),
    onSuccess: (data) => {
      if (data?.ok === false) {
        toast.info(data.error)
      }
    }
  })
}
