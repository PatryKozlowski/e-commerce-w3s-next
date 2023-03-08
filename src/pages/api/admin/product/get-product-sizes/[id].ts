import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const getProductSizeHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role !== 'admin' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'HTTP method not valid (only GET)', status: res.statusCode })
  }

  const { id } = req.query
  const productId = id as string

  try {
    const rawSizes = await prisma.products.findUnique({
      where: {
        id: productId
      },
      select: {
        sizeXS: true,
        sizeS: true,
        sizeM: true,
        sizeL: true,
        sizeXL: true
      }
    })

    const sizes = [
      ...rawSizes?.sizeXS ?? [],
      ...rawSizes?.sizeS ?? [],
      ...rawSizes?.sizeM ?? [],
      ...rawSizes?.sizeL ?? [],
      ...rawSizes?.sizeXL ?? []
    ]

    return res.status(200).json(sizes)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export default getProductSizeHandler
