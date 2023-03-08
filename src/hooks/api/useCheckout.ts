import type { HandleProduct } from '@/components/OneProduct/types'
import { checkoutProducts } from '@/lib/services/stripe/checkoutProducts'
import type { CheckoutSessionProps } from '@/lib/services/types'
import { redirectToCheckout } from '@/lib/utils/stripe/getStripe'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useCheckout = (): UseMutationResult<CheckoutSessionProps, unknown, HandleProduct[], unknown> => {
  return useMutation({
    mutationFn: async (data: HandleProduct[]) => await checkoutProducts(data),
    onSuccess: async (data) => {
      if (data.status === 200) {
        await redirectToCheckout(data.id)
      } else {
        console.log(data.message)
      }

      if (data.message === 'Not enough product in stock') {
        toast.info(data.message)
      }
    }
  })
}
