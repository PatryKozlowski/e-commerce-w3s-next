import { HandleProduct } from '@/components/OneProduct/types'
import { fetcher } from '@/lib/utils/fetcher'
import type { CheckoutSessionProps } from '../types'

export const checkoutProducts = async (products: HandleProduct[]): Promise<CheckoutSessionProps> => {
  return await fetcher('/api/stripe/checkout-session', {
    method: 'POST',
    body: products
  })
}
