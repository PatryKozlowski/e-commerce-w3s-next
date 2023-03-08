import { loadStripe } from '@stripe/stripe-js'

export const redirectToCheckout = async (session: string) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

  // eslint-disable-next-line @typescript-eslint/return-await
  return await stripe?.redirectToCheckout({
    sessionId: session
  })
}
