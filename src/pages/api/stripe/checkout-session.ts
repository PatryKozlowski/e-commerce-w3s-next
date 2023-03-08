import type { HandleProduct } from '@/components/OneProduct/types'
import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

const checkoutSessionsHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  const userId = session?.user?.id as string

  if (req.method === 'POST') {
    const stripeItems: HandleProduct[] = req.body
    let newCustomer: Stripe.Customer
    const checkout = async (): Promise<void> => {
      try {
        const customer = await stripe.customers.create({
          metadata: {
            userId,
            cart: JSON.stringify(stripeItems.map((product: HandleProduct) => ({
              id: product.id,
              quantity: product.quantity,
              size: product.size,
              image: `${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${product.image}?alt=media`
            })))
          }
        })
        newCustomer = customer
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message, status: 500 })
        } else {
          console.log('Unexpected error', error)
        }
      }

      const transformedItems = stripeItems.map((item: HandleProduct) => ({
        price_data: {
          currency: 'usd',
          unit_amount: (item.price * 1000) / 10,
          product_data: {
            name: item.name,
            images: [`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${item.image}?alt=media`]
          }
        },
        quantity: item.quantity
      }))

      try {
        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
          line_items: transformedItems,
          customer: newCustomer.id,
          mode: 'payment',
          shipping_address_collection: {
            allowed_countries: ['PL', 'US']
          },
          success_url: `${req.headers.origin as string}/success`,
          cancel_url: `${req.headers.origin as string}/`
        })
        return res.status(200).json({ id: session.id, status: 200 })
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message, status: 500 })
        } else {
          console.log('Unexpected error', error)
        }
      }
    }
    stripeItems.forEach(async (product: HandleProduct) => {
      switch (product.size) {
        case 'XS':
          try {
            const item = await prisma.sizeXS.findUnique({
              where: {
                productId: product.id
              }
            })

            const quantityOfProductInStock = item?.stock ?? 0
            const qunatityOfProductInCart = product.quantity

            const isAboveQuantityInStock = quantityOfProductInStock < qunatityOfProductInCart

            if (isAboveQuantityInStock) {
              return res.status(500).json({ message: 'Not enough product in stock', satus: 500 })
            }
            await checkout()
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message)
            } else {
              console.log('Unexpected error', error)
            }
          }
          break

        case 'S':
          try {
            const item = await prisma.sizeS.findUnique({
              where: {
                productId: product.id
              }
            })

            const quantityOfProductInStock = item?.stock ?? 0
            const qunatityOfProductInCart = product.quantity

            const isAboveQuantityInStock = quantityOfProductInStock < qunatityOfProductInCart

            if (isAboveQuantityInStock) {
              return res.status(500).json({ message: 'Not enough product in stock', satus: 500 })
            }
            await checkout()
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message)
            } else {
              console.log('Unexpected error', error)
            }
          }
          break

        case 'M':
          try {
            const item = await prisma.sizeM.findUnique({
              where: {
                productId: product.id
              }
            })

            const quantityOfProductInStock = item?.stock ?? 0
            const qunatityOfProductInCart = product.quantity

            const isAboveQuantityInStock = quantityOfProductInStock < qunatityOfProductInCart

            if (isAboveQuantityInStock) {
              return res.status(500).json({ message: 'Not enough product in stock', satus: 500 })
            }
            await checkout()
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message)
            } else {
              console.log('Unexpected error', error)
            }
          }
          break

        case 'L':
          try {
            const item = await prisma.sizeL.findUnique({
              where: {
                productId: product.id
              }
            })

            const quantityOfProductInStock = item?.stock ?? 0
            const qunatityOfProductInCart = product.quantity

            const isAboveQuantityInStock = quantityOfProductInStock < qunatityOfProductInCart

            if (isAboveQuantityInStock) {
              return res.status(500).json({ message: 'Not enough product in stock', satus: 500 })
            } else {
              await checkout()
            }
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message)
            } else {
              console.log('Unexpected error', error)
            }
          }
          break

        case 'XL':
          try {
            const item = await prisma.sizeXL.findUnique({
              where: {
                productId: product.id
              }
            })

            const quantityOfProductInStock = item?.stock ?? 0
            const qunatityOfProductInCart = product.quantity

            const isAboveQuantityInStock = quantityOfProductInStock < qunatityOfProductInCart

            if (isAboveQuantityInStock) {
              return res.status(500).json({ message: 'Not enough product in stock', satus: 500 })
            }
            await checkout()
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message)
            } else {
              console.log('Unexpected error', error)
            }
          }
          break

        default:
          return false
      }
    })
  } else {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: 405 })
  }
}

export default checkoutSessionsHandler
