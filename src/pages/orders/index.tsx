import OrdersList from '@/components/OrdersList/OrdersList'
import type { OrderProps } from '@/components/OrdersList/types'
import Wrapper from '@/components/Wrapper/Wrapper'
import prisma from '@/lib/utils/prisma'
import moment from 'moment'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Stripe from 'stripe'

const OrdersPage = ({ orders }: OrderProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Orders</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <Wrapper>
        <OrdersList orders={orders}/>
      </Wrapper>
    </>
  )
}

export default OrdersPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
  })

  const userOrders = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string
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

  const filteredOrders = () => {
    if (!ctx.query.status && !ctx.query.delivery && !ctx.query.payment) {
      return ordersData
    }

    if (!ctx.query.status && !ctx.query.payment) {
      return ordersData.filter((order) => order?.delivery === ctx.query.delivery)
    }

    if (!ctx.query.status && !ctx.query.delivery) {
      return ordersData.filter((order) => order?.payment === ctx.query.payment)
    }

    if (!ctx.query.payment && !ctx.query.delivery) {
      return ordersData.filter((order) => order?.status === ctx.query.status)
    }

    if (!ctx.query.status) {
      return ordersData.filter((order) => order?.delivery === ctx.query.delivery && order?.payment === ctx.query.payment)
    }
    if (!ctx.query.delivery) {
      return ordersData.filter((order) => order?.status === ctx.query.status && order?.payment === ctx.query.payment)
    }
    if (!ctx.query.payment) {
      return ordersData.filter((order) => order?.status === ctx.query.status && order?.delivery === ctx.query.delivery)
    }
    return ordersData.filter((order) => order?.delivery === ctx.query.delivery && order?.payment === ctx.query.payment && order?.status === ctx.query.status)
  }

  return {
    props: {
      orders: JSON.parse(JSON.stringify(filteredOrders()))
    }
  }
}
