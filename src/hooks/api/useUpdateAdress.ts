import type { FormUserAdress } from '@/components/UserAdress/types'
import type { ResponseProps } from '@/lib/services/types'
import { updateAdress } from '@/lib/services/user/updateAdress'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useUpdateAdress = (): UseMutationResult<ResponseProps, unknown, FormUserAdress, unknown> => {
  return useMutation({
    mutationFn: async (data: FormUserAdress) => await updateAdress(data),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message)
      } else {
        toast.info(data.message)
      }
    }
  })
}
