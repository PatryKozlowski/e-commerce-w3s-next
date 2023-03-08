import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const createProductHandler = async (req: NextApiRequest & { [key: string]: any }, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role !== 'admin' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: res.statusCode })
  }

  const {
    uniqueId,
    imagesUrl,
    productName,
    productDesc,
    productPrice,
    productType,
    productInfo,
    jeansType = null,
    productSizeXS,
    productSizeS,
    productSizeM,
    productSizeL,
    productSizeXL
  } = req.body

  if (!uniqueId) {
    return res.status(404).json({ message: 'Unique ID is required', status: res.statusCode })
  }

  if (!imagesUrl) {
    return res.status(404).json({ message: 'Product image is required', status: res.statusCode })
  }

  if (!productName) {
    return res.status(404).json({ message: 'Product name is required', status: res.statusCode })
  }

  if (!productDesc) {
    return res.status(404).json({ message: 'Product description is required', status: res.statusCode })
  }

  if (!productType) {
    return res.status(404).json({ message: 'Type of product is required', status: res.statusCode })
  }

  if (!productInfo) {
    return res.status(404).json({ message: 'Type of product info is required', status: res.statusCode })
  }

  if (productType === 'jeans' && !jeansType) {
    return res.status(404).json({ message: 'Type of jeans is required', status: res.statusCode })
  }

  if (productSizeXS < 0 || productSizeS < 0 || productSizeM < 0 || productSizeL < 0 || productSizeXL < 0) {
    return res.status(404).json({ message: 'Quantity cannot be negative', status: res.statusCode })
  }

  if (productPrice <= 0) {
    return res.status(404).json({ message: 'Price cannot be negative', status: res.statusCode })
  }

  const parsePrice = productPrice.replace(/,/g, '.')

  try {
    const isCreated = await prisma.products.create({
      data: {
        id: uniqueId,
        product: productType,
        name: productName,
        description: productDesc,
        image: imagesUrl,
        price: Number(parsePrice),
        info: productInfo,
        jeansType: jeansType || null
      }
    })
    if (isCreated) {
      if (productSizeXS > 0 || productSizeS > 0 || productSizeM > 0 || productSizeL > 0 || productSizeXL > 0) {
        try {
          await prisma.sizeXS.create({
            data: {
              stock: Number(productSizeXS),
              productId: isCreated.id
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
          }
        }

        try {
          await prisma.sizeS.create({
            data: {
              stock: Number(productSizeS),
              productId: isCreated.id
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
          }
        }

        try {
          await prisma.sizeM.create({
            data: {
              stock: Number(productSizeM),
              productId: isCreated.id
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
          }
        }

        try {
          await prisma.sizeL.create({
            data: {
              stock: Number(productSizeL),
              productId: isCreated.id
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
          }
        }

        try {
          await prisma.sizeXL.create({
            data: {
              stock: Number(productSizeXL),
              productId: isCreated.id
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message)
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'Create product failed', status: res.statusCode })
    } else {
      console.log(error)
    }
  }
  return res.status(200).json({ message: 'Product created', status: res.statusCode })
}

export default createProductHandler
