import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const getProductsListHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role !== 'admin' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'HTTP method not valid (only GET)', status: res.statusCode })
  }

  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        jeansType: true,
        name: true,
        product: true,
        info: true,
        image: true,
        price: true
      }
    })
    return res.status(200).json(products)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export default getProductsListHandler
