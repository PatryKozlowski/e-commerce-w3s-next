import prisma from '@/lib/utils/prisma'
import type { Products } from '@prisma/client'

export const getProducts = async () => {
  const products: Products[] = await prisma.products.findMany()
  return products
}
