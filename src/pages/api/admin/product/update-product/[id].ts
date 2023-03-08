import prisma from '@/lib/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const updateProductHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session || session.user?.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'HTTP method not valid (only PATCH)', status: 405 })
  }

  const { id } = req.query
  const productId = id as string

  const {
    productName,
    productDesc,
    productPrice,
    productSizeXS = 0,
    productSizeS = 0,
    productSizeM = 0,
    productSizeL = 0,
    productSizeXL
  } = req.body

  if (!productName) {
    return res.status(404).json({ message: 'Product name is required', status: 404 })
  }

  if (!productDesc) {
    return res.status(404).json({ message: 'Product description is required', status: 404 })
  }

  if (!productPrice) {
    return res.status(404).json({ message: 'Product price is required', status: 404 })
  }

  if (productPrice <= 0) {
    return res.status(404).json({ message: 'Price cannot be negative', status: 404 })
  }

  if (productSizeXS < 0 || productSizeS < 0 || productSizeM < 0 || productSizeL < 0 || productSizeXL < 0) {
    return res.status(404).json({ message: 'Quantity cannot be negative', status: 404 })
  }

  if (isNaN(productPrice) || productPrice < 0) {
    return res.status(404).json({ message: 'Invalid product price', status: 404 })
  }

  try {
    await prisma.products.update({
      where: {
        id: productId
      },
      data: {
        name: productName,
        description: productDesc,
        price: Number(productPrice)
      }
    })

    try {
      await prisma.sizeXS.upsert({
        where: {
          productId
        },
        update: {
          stock: Number(productSizeXS),
          updatedAt: new Date()
        },
        create: {
          productId,
          stock: Number(productSizeXS)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      await prisma.sizeS.upsert({
        where: {
          productId
        },
        update: {
          stock: Number(productSizeS),
          updatedAt: new Date()
        },
        create: {
          productId,
          stock: Number(productSizeS)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      await prisma.sizeM.upsert({
        where: {
          productId
        },
        update: {
          stock: Number(productSizeM),
          updatedAt: new Date()
        },
        create: {
          productId,
          stock: Number(productSizeM)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      await prisma.sizeL.upsert({
        where: {
          productId
        },
        update: {
          stock: Number(productSizeL),
          updatedAt: new Date()
        },
        create: {
          productId,
          stock: Number(productSizeL)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      await prisma.sizeXL.upsert({
        where: {
          productId
        },
        update: {
          stock: Number(productSizeXL),
          updatedAt: new Date()
        },
        create: {
          productId,
          stock: Number(productSizeXL)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    return res.status(200).json({ message: 'Product updated', status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'Update product failed', status: 400 })
    } else {
      console.log(error)
    }
  }
}

export default updateProductHandler
