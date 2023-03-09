import prisma from '@/lib/utils/prisma'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Stripe from 'stripe'

const getOrdersHanlder = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role === 'user' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'HTTP method not valid (only GET)', status: res.statusCode })
  }

  const { id } = req.query
  const userId = id as string

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
  })

  const userOrders = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      orders: true
    }
  })

  const orders = userOrders?.orders ?? []

  const ordersData = await Promise.all(orders.map(async (order) => {
    try {
      const userCart = await prisma.usersCart.findUnique({
        where: {
          sessionId: order.sessionId
        }
      })

      const dataStripe = await stripe.checkout.sessions.listLineItems(order.sessionId, {
        limit: 100
      })

      return {
        id: order.id,
        productId: userCart?.productId,
        images: userCart?.image,
        total: dataStripe.data.reduce((acc, val) => acc + val.amount_total, 0) / 100,
        date: moment(order.createdAt).unix(),
        status: order.status,
        delivery: order.delivery,
        payment: order.payment
      }
    } catch (error) {
      if (error instanceof Error) {
        return console.log('Error occurred during featching order data ', error.message)
      } else {
        console.log('Unexpected error', error)
      }
    }
  }))

  return res.status(200).json(ordersData)
}
export default getOrdersHanlder
