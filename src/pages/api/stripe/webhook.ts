import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Stripe from 'stripe'
import type { PaymentStatus } from '@prisma/client'
import prisma from '@/lib/utils/prisma'

export interface CustomerData {
  id: string
  size: string
  quantity: number
  image: string
}

export interface EventDataCustomer extends Stripe.Event.Data.Object {
  id: string
  customer: string
  payment_status: string
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

export const config = {
  api: {
    bodyParser: false
  }
}

const webhook = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature'] as string
    const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_KEY as string

    const paymentStatus = (status: string): PaymentStatus => {
      if (status === 'paid') {
        return 'Paid'
      } else if (status === 'unpaid') {
        return 'Unpaid'
      } else {
        return 'Failed'
      }
    }

    const updateStock = async (customer: CustomerData[]): Promise<void> => {
      console.log('przed sieze xs')
      customer.forEach(async ({ size, quantity, id }: CustomerData) => {
        switch (size) {
          case 'XS':
            try {
              const productId = await prisma.sizeXS.findUnique({
                where: {
                  productId: id
                }
              })

              const quantityOfProductInStock = productId?.stock ?? 0

              const newQuantityOfProductInStock =
                quantityOfProductInStock - quantity
              await prisma.sizeXS.update({
                where: {
                  productId: id
                },
                data: {
                  stock: newQuantityOfProductInStock
                }
              })
            } catch (error) {
              if (error instanceof Error) {
                return res.status(500).json({
                  message: error.message ?? 'Update size XS error occured',
                  satus: 500
                })
              } else {
                console.log('Unexpected error', error)
              }
            }
            break

          case 'S':
            try {
              const productId = await prisma.sizeS.findUnique({
                where: {
                  productId: id
                }
              })

              const quantityOfProductInStock = productId?.stock ?? 0

              const newQuantityOfProductInStock =
                quantityOfProductInStock - quantity
              await prisma.sizeS.update({
                where: {
                  productId: id
                },
                data: {
                  stock: newQuantityOfProductInStock
                }
              })
            } catch (error) {
              if (error instanceof Error) {
                return res.status(500).json({
                  message: error.message ?? 'Update size S error occured',
                  satus: 500
                })
              } else {
                console.log('Unexpected error', error)
              }
            }
            break

          case 'M':
            try {
              const productId = await prisma.sizeM.findUnique({
                where: {
                  productId: id
                }
              })

              const quantityOfProductInStock = productId?.stock ?? 0

              const newQuantityOfProductInStock =
                quantityOfProductInStock - quantity
              await prisma.sizeM.update({
                where: {
                  productId: id
                },
                data: {
                  stock: newQuantityOfProductInStock
                }
              })
            } catch (error) {
              if (error instanceof Error) {
                return res.status(500).json({
                  message: error.message ?? 'Update size M error occured',
                  satus: 500
                })
              } else {
                console.log('Unexpected error', error)
              }
            }
            break

          case 'L':
            try {
              const productId = await prisma.sizeL.findUnique({
                where: {
                  productId: id
                }
              })

              const quantityOfProductInStock = productId?.stock ?? 0

              const newQuantityOfProductInStock =
                quantityOfProductInStock - quantity
              await prisma.sizeL.update({
                where: {
                  productId: id
                },
                data: {
                  stock: newQuantityOfProductInStock
                }
              })
            } catch (error) {
              if (error instanceof Error) {
                return res.status(500).json({
                  message: error.message ?? 'Update size L error occured',
                  satus: 500
                })
              } else {
                console.log('Unexpected error', error)
              }
            }
            break

          case 'XL':
            try {
              const productId = await prisma.sizeXL.findUnique({
                where: {
                  productId: id
                }
              })

              const quantityOfProductInStock = productId?.stock ?? 0

              const newQuantityOfProductInStock =
                quantityOfProductInStock - quantity
              await prisma.sizeXL.update({
                where: {
                  productId: id
                },
                data: {
                  stock: newQuantityOfProductInStock
                }
              })
            } catch (error) {
              if (error instanceof Error) {
                return res.status(500).json({
                  message: error.message ?? 'Update size XL error occured',
                  satus: 500
                })
              } else {
                console.log('Unexpected error', error)
              }
            }
            break

          default:
            console.log('Update size error occured')
            break
        }
      })
    }

    const createUserCartAndOrders = async (
      customerData: Stripe.Customer,
      data: EventDataCustomer,
      transformedCutomerData: CustomerData[]
    ): Promise<void> => {
      try {
        await prisma.usersOrders.create({
          data: {
            userId: customerData.metadata.userId,
            sessionId: data?.id,
            payment: paymentStatus(data?.payment_status)
          }
        })
      } catch (error) {
        if (error instanceof Error) {
          return res
            .status(500)
            .json({ message: 'Error during user order creation', satus: 500 })
        } else {
          console.log('Unexpected error', error)
        }
      }
      try {
        await prisma.usersCart.create({
          data: {
            userId: customerData?.metadata?.userId,
            sessionId: data?.id,
            productId: transformedCutomerData.map((item) => item?.id),
            image: transformedCutomerData.map((item) => item?.image),
            size: transformedCutomerData.map((item) => item?.size),
            order: {
              connect: {
                sessionId: data?.id
              }
            }
          }
        })
      } catch (error) {
        if (error instanceof Error) {
          return res
            .status(500)
            .json({ message: 'Error during user cart creation', satus: 500 })
        } else {
          console.log('Unexpected error', error)
        }
      }
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('Unexpected error', error)
      }
      return res
        .status(400)
        .json({ message: 'Webhook signature verification failed', satus: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const data = event?.data?.object as EventDataCustomer

        try {
          const customerData: Stripe.Customer | Stripe.DeletedCustomer =
            await stripe.customers.retrieve(data.customer)
          if (customerData instanceof Object && 'metadata' in customerData) {
            const transformedCutomerData: CustomerData[] = JSON.parse(
              customerData.metadata.cart
            )
            await createUserCartAndOrders(
              customerData,
              data,
              transformedCutomerData
            )
            await updateStock(transformedCutomerData)
          }
        } catch (error) {
          if (error instanceof Error) {
            return res.status(500).json({
              message:
                error.message ?? 'Stripe customer retrieve error occured',
              satus: 500
            })
          } else {
            console.log('Unexpected error', error)
          }
        }
        return res.json({ received: true })
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } else {
    return res
      .status(405)
      .json({ message: 'HTTP method not valid (only POST)', satus: 405 })
  }
}

export default webhook
