import type { JeansType, ProductInfo, ProductType } from '@prisma/client'

export interface ProductProps {
  id: string
  product: ProductType
  name: string
  description: string
  image: string
  price: number
  jeansType: JeansType | null
  info: ProductInfo | null
  createdAt: Date
  updatedAt: Date
}
