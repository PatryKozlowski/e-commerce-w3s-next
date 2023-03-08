import type Prisma from '@prisma/client'

export interface ProductsListProps {
  products: Prisma.Products[]
  sizes: Prisma.SizeXS[]
}
