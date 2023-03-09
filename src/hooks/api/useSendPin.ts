import type { ResponseProps } from '@/lib/services/types'
import { sendPin } from '@/lib/services/user/sendPin'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'

export const useSendPin = (): UseMutationResult<ResponseProps, unknown, void, unknown> => {
  return useMutation({
    mutationFn: sendPin
  })
}
