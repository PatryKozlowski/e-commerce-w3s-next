import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const deleteProductHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role === 'user' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: res.statusCode })
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'HTTP method not valid (only DELETE)', status: res.statusCode })
  }

  const id = req.body

  if (!id) {
    return res.status(404).json({ message: 'You must specify a product ID', status: res.statusCode })
  }

  try {
    const product = await prisma.products.findUnique({ where: { id } })

    if (!product) {
      return res.status(404).json({ message: 'Product not found', status: res.statusCode })
    }

    try {
      await prisma.products.delete({
        where: {
          id
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    return res.status(200).json({ message: 'Product successfully deleted', status: res.statusCode })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name, error.message)
      return res.status(400).json({ message: error.message, status: res.statusCode })
    }
  }
}

export default deleteProductHandler
